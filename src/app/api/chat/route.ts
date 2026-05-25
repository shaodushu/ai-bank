import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import {
  chatTools,
  toolTagMappings,
  ToolTagMapping,
  MOCK_PRODUCTS,
  MOCK_MANAGERS,
  MOCK_FINANCIAL_PRODUCTS,
  MOCK_LOAN_INFO,
  MOCK_COUPONS,
} from './tools';

// ============================================================
// 动态生成系统提示词 — 从 toolTagMappings 自动生成
// ============================================================
function generateSystemPrompt(mappings: ToolTagMapping[]): string {
  const tagExamples = mappings
    .map((m) => `<${m.tagName} ${m.tagAttribute}="xxx" />`)
    .join('、');

  let prompt = `你是一个银行 App 内的 AI 客服助手，名叫小新，专注于信贷和理财业务。

## 工作流程

当用户询问相关业务时，请按以下步骤操作：

1. **先查数据** — 调用对应的 get_* 工具获取真实数据，不要自己编造
2. **再展示** — 将 get_* 返回的数据传递给对应的 output_* 函数，并插入对应的展示标签

## 必须遵守的规则

`;

  mappings.forEach((mapping, index) => {
    prompt += `### ${index + 1}. ${mapping.description}时\n`;
    prompt += '你必须**同时**做两件事：\n';
    prompt += `a) 调用 ${mapping.toolName} 函数，传入 8 位随机 dataKey 和完整的数据\n`;
    prompt += `b) 在回复文本中插入 <${mapping.tagName} ${mapping.tagAttribute}="刚才的dataKey" /> 标签\n\n`;
    prompt += `**注意：${mapping.promptNote}**\n\n`;
  });

  prompt += `### ${mappings.length + 1}. 输出格式（非常重要）\n`;
  prompt += '你的回复必须按以下三部分顺序输出，各部分之间用固定分隔符隔开：\n\n';
  prompt += '**第一部分：主内容**\n';
  prompt += '- 包含对用户问题的回答\n';
  prompt += '- 如果有产品数据，在此部分插入对应的展示标签\n';
  prompt += `- 标签必须自闭合：${tagExamples}\n`;
  prompt += '- 标签名前不能有空格\n\n';
  prompt += '---DISCLAIMER---\n\n';
  prompt += '**第二部分：免责声明**\n';
  prompt += '- 固定文本：以上内容均为AI生成，内容仅供参考，请自行甄别。\n\n';
  prompt += '---FOLLOWUP---\n\n';
  prompt += '**第三部分：追问或其他业务组件标签**\n';
  prompt += '- 如果有追问，在此部分插入 <Ask data-key="xxx" /> 标签\n';
  prompt += '- 如果没有追问，此部分留空\n\n';

  prompt += `### ${mappings.length + 2}. 行为准则\n`;
  prompt += '- 使用礼貌、清晰的口语化表达\n';
  prompt += '- 回答信贷业务、理财业务等相关问题，超出范围礼貌拒绝\n';
  prompt += '- 不涉及申请、审批、放款等操作流程\n\n';

  prompt += '### ⚠️ 重要\n';
  prompt += `函数调用和标签中的 ${mappings[0]?.tagAttribute || 'data-key'} 值必须完全一致，否则前端无法渲染。`;

  return prompt;
}

// ============================================================
// 从内容中移除 DSML 标记（模型可能输出的 <|DSML|...|> 等标签）
// ============================================================
function stripToolCallMarkup(text: string): string {
  return text
    .replace(/<\|[^|]+\|>/g, '')
    .replace(/<\/?tool_calls[^>]*>/g, '')
    .replace(/<\/?invoke[^>]*>/g, '')
    .replace(/<\/?parameter[^>]*>/g, '');
}

// ============================================================
// 从内容中解析标签，提取 dataKey 并生成兜底 metadata
// ============================================================
function parseMetadataFromContent(
  content: string,
  mappings: ToolTagMapping[]
): Record<string, any> {
  const metadata: Record<string, any> = {};

  for (const mapping of mappings) {
    const regex = new RegExp(
      `<\\s*${mapping.tagName}\\s+${mapping.tagAttribute}\\s*=\\s*"([^"]+)"\\s*\\/?\\s*>`,
      'gi'
    );
    let match;
    while ((match = regex.exec(content)) !== null) {
      const key = match[1];
      if (!metadata[key]) {
        metadata[key] = mapping.defaultPlaceholder;
      }
    }
  }

  return metadata;
}

// ============================================================
// 自动补全缺失的展示标签
// ============================================================
function autoCompleteTags(
  content: string,
  toolKeyMap: Map<string, string>,
  mappings: ToolTagMapping[]
): string {
  let result = content;

  for (const [dataKey, tagName] of toolKeyMap.entries()) {
    const mapping = mappings.find((m) => m.tagName === tagName);
    if (!mapping) continue;

    const tagRegex = new RegExp(
      `<${mapping.tagName}\\s+${mapping.tagAttribute}\\s*=\\s*"${dataKey}"\\s*\\/?\\s*>`,
      'i'
    );

    if (!tagRegex.test(result)) {
      result += `\n\n<${mapping.tagName} ${mapping.tagAttribute}="${dataKey}" />`;
    }
  }

  return result;
}

// ============================================================
// 执行工具调用 — 处理 get_products 等数据查询工具
// ============================================================
function executeToolCall(
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall
): OpenAI.Chat.Completions.ChatCompletionToolMessageParam | null {
  if (toolCall.type !== 'function') return null;
  if (toolCall.function.name === 'get_products') {
    return {
      role: 'tool',
      tool_call_id: toolCall.id,
      content: JSON.stringify({ results: MOCK_PRODUCTS }),
    };
  }
  if (toolCall.function.name === 'get_customer_managers') {
    return {
      role: 'tool',
      tool_call_id: toolCall.id,
      content: JSON.stringify({ results: MOCK_MANAGERS }),
    };
  }
  if (toolCall.function.name === 'get_financial_products') {
    return {
      role: 'tool',
      tool_call_id: toolCall.id,
      content: JSON.stringify({ results: MOCK_FINANCIAL_PRODUCTS }),
    };
  }
  if (toolCall.function.name === 'get_loan_info') {
    return {
      role: 'tool',
      tool_call_id: toolCall.id,
      content: JSON.stringify({ results: MOCK_LOAN_INFO }),
    };
  }
  if (toolCall.function.name === 'get_coupons') {
    return {
      role: 'tool',
      tool_call_id: toolCall.id,
      content: JSON.stringify({ results: MOCK_COUPONS }),
    };
  }
  return null;
}

// ============================================================
// 从 tool_calls 中提取 metadata
// ============================================================
function extractMetadataFromToolCalls(
  toolCalls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[]
): { metadata: Record<string, any>; toolKeyMap: Map<string, string> } {
  const metadata: Record<string, any> = {};
  const toolKeyMap: Map<string, string> = new Map();

  for (const tc of toolCalls) {
    if (tc.type !== 'function') continue;
    const mapping = toolTagMappings.find((m) => m.toolName === tc.function.name);
    if (!mapping) continue;
    try {
      const args = JSON.parse(tc.function.arguments);
      const entries = mapping.extractEntries(args);
      for (const entry of entries) {
        if (entry.data == null) continue;
        if (Array.isArray(entry.data) && entry.data.length === 0) continue;
        if (
          typeof entry.data === 'object' &&
          !Array.isArray(entry.data) &&
          Object.keys(entry.data).length === 0
        )
          continue;
        metadata[entry.key] = entry.data;
        toolKeyMap.set(entry.key, mapping.tagName);
      }
    } catch {
      // JSON 解析失败时静默跳过
    }
  }

  return { metadata, toolKeyMap };
}

// ============================================================
// POST 路由
// ============================================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
    });

    // 动态生成系统提示词
    const systemPrompt = generateSystemPrompt(toolTagMappings);

    // 构建消息列表
    const apiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ];

    // 多轮工具调用：模型可能先调 get_products，再调 output_products
    let finalContent = '';
    let finalToolCalls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[] | null = null;

    for (let round = 0; round < 3; round++) {
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'deepseek-chat',
        messages: apiMessages,
        tools: chatTools,
        stream: false,
      });

      const message = completion.choices[0]?.message;
      if (!message) break;

      // 收集最终 content 和 tool_calls
      if (message.content) {
        finalContent = message.content;
      }
      if (message.tool_calls) {
        finalToolCalls = message.tool_calls;
      }

      // 检查是否有可执行的数据查询工具调用
      const toolResults: OpenAI.Chat.Completions.ChatCompletionToolMessageParam[] = [];
      for (const tc of message.tool_calls || []) {
        const result = executeToolCall(tc);
        if (result) {
          toolResults.push(result);
        }
      }

      if (toolResults.length === 0) {
        // 没有需要执行的数据查询工具，结束循环
        break;
      }

      // 将工具结果追加到消息列表，继续下一轮
      apiMessages.push(message);
      apiMessages.push(...toolResults);
    }

    let content = finalContent || '';
    const toolCalls = finalToolCalls;

    // 解析 metadata
    const { metadata, toolKeyMap } = toolCalls
      ? extractMetadataFromToolCalls(toolCalls)
      : { metadata: {}, toolKeyMap: new Map<string, string>() };

    // 从内容解析标签（补充 tool_calls 未覆盖的数据）
    const contentMetadata = parseMetadataFromContent(content, toolTagMappings);
    for (const [key, value] of Object.entries(contentMetadata)) {
      if (!metadata[key]) {
        metadata[key] = value;
      }
    }

    // 兜底：如果标签有 data-key 但数据是空数组，使用 MOCK_COUPONS 作为默认展示
    for (const [key, value] of Object.entries(metadata)) {
      if (Array.isArray(value) && value.length === 0) {
        const couponMapping = toolTagMappings.find((m) => m.tagName === 'CouponCard');
        if (couponMapping && content.includes(`<CouponCard data-key="${key}"`)) {
          metadata[key] = MOCK_COUPONS;
        }
      }
    }

    // 自动补全缺失的展示标签
    content = autoCompleteTags(content, toolKeyMap, toolTagMappings);

    // 移除 DSML 标记（防止模型输出 <|DSML|...|> 到前端）
    content = stripToolCallMarkup(content);

    const encoder = new TextEncoder();
    const responseStream = new ReadableStream({
      async start(controller) {
        try {
          // 1. 优先发送 metadata
          if (Object.keys(metadata).length > 0) {
            const payload = JSON.stringify({
              type: 'metadata',
              data: metadata,
            });
            controller.enqueue(encoder.encode(`data: ${payload}\n`));
          }

          // 2. 逐字流式输出文本内容
          for (const char of content) {
            const payload = JSON.stringify({
              type: 'text',
              content: char,
            });
            controller.enqueue(encoder.encode(`data: ${payload}\n`));
          }
        } catch (err) {
          console.error('流处理错误:', err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(responseStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('API 路由错误:', error);
    return new Response(
      JSON.stringify({ error: '服务器内部错误' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}