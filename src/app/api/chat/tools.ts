import { ChatCompletionTool } from 'openai/resources';

// ============================================================
// Mock 数据 — 银行产品数据
// ============================================================
export const MOCK_PRODUCTS = [
  {
    id: 'prod_001',
    name: '随心智贷',
    tag: '消费贷',
    tagColor: '#FFEBCE',
    tagTextColor: '#C85930',
    maxAmount: '200,000',
    rate: '最低年化利率(单利)3.2%起',
  },
  {
    id: 'prod_002',
    name: '经营快贷',
    tag: '经营贷',
    tagColor: '#D4F0FF',
    tagTextColor: '#1A7DB8',
    maxAmount: '500,000',
    rate: '最低年化利率(单利)3.5%起',
  },
  {
    id: 'prod_003',
    name: '薪享贷',
    tag: '消费贷',
    tagColor: '#E8F5E9',
    tagTextColor: '#2E7D32',
    maxAmount: '100,000',
    rate: '最低年化利率(单利)3.0%起',
  },
  {
    id: 'prod_004',
    name: '房抵贷',
    tag: '抵押贷',
    tagColor: '#F3E5F5',
    tagTextColor: '#7B1FA2',
    maxAmount: '1,000,000',
    rate: '最低年化利率(单利)2.8%起',
  },
];

// ============================================================
// Mock 数据 — 理财数据
// ============================================================
export const MOCK_FINANCIAL_PRODUCTS = [
  {
    id: 'fin_001',
    name: '理财',
    totalAmount: '¥9,525.32',
    yesterdayProfit: '-¥95.32',
    yesterdayProfitColor: '#3EA851',
    totalProfit: '+¥2,534.32',
    totalProfitColor: '#DF3020',
  },
  {
    id: 'fin_002',
    name: '基金',
    totalAmount: '¥15,230.50',
    yesterdayProfit: '+¥230.15',
    yesterdayProfitColor: '#DF3020',
    totalProfit: '+¥3,520.80',
    totalProfitColor: '#DF3020',
  },
  {
    id: 'fin_003',
    name: '定期',
    totalAmount: '¥50,000.00',
    yesterdayProfit: '+¥12.50',
    yesterdayProfitColor: '#DF3020',
    totalProfit: '+¥1,250.00',
    totalProfitColor: '#DF3020',
  },
];

// ============================================================
// Mock 数据 — 客户经理数据
// ============================================================
export const MOCK_MANAGERS = [
  {
    id: 'mgr_001',
    name: '邓经理',
    productName: '希望贷-消费贷',
    productTag: '信用类',
    productTagColor: '#E7EFFE',
    productTagTextColor: '#407FFF',
    unit: '铜川市印台区农村信用合作联社印台分社',
    phone: '13012346178',
  },
  {
    id: 'mgr_002',
    name: '李经理',
    productName: '经营快贷',
    productTag: '经营类',
    productTagColor: '#D4F0FF',
    productTagTextColor: '#1A7DB8',
    unit: '西安市雁塔区农村信用合作联社',
    phone: '13812345678',
  },
  {
    id: 'mgr_003',
    name: '王经理',
    productName: '房抵贷',
    productTag: '抵押类',
    productTagColor: '#F3E5F5',
    productTagTextColor: '#7B1FA2',
    unit: '宝鸡市渭滨区农村信用合作联社',
    phone: '13612345678',
  },
];

// ============================================================
// Mock 数据 — 贷款信息数据
// ============================================================
export const MOCK_LOAN_INFO = [
  {
    id: 'loan_001',
    dueDate: '9月14日',
    amount: '6031.09',
    loanCount: 2,
    tags: [],
  },
  {
    id: 'loan_002',
    dueDate: '9月17日',
    amount: '6031.09',
    loanCount: 2,
    tags: [{ name: '农户专享贷', tagColor: '#BD8A00', tagBgColor: 'rgba(189,138,0,0.10)' }],
  },
  {
    id: 'loan_003',
    dueDate: '9月22日',
    amount: '6031.09',
    loanCount: 2,
    tags: [
      { name: '农户专享贷', tagColor: '#BD8A00', tagBgColor: 'rgba(189,138,0,0.10)' },
      { name: '担保抵押贷', tagColor: '#BD8A00', tagBgColor: 'rgba(189,138,0,0.10)' },
    ],
  },
];

// ============================================================
// ToolTagMapping：将工具函数与前端展示标签关联
// 新增工具+标签时，只需在此添加一条配置即可
// ============================================================
export interface ToolTagMapping {
  /** OpenAI 工具函数名 */
  toolName: string;
  /** 前端展示组件标签名（如 ProductList、Ask） */
  tagName: string;
  /** 标签上用于关联的 HTML 属性名（如 data-key） */
  tagAttribute: string;
  /** 在系统提示词中展示的描述（如"展示产品列表"） */
  description: string;
  /** 系统提示词中该工具的注意事项文本 */
  promptNote: string;
  /** 当内容中有标签但 tool_calls 未覆盖时，使用的兜底数据 */
  defaultPlaceholder: any;
  /** 从工具调用参数中提取 { key, data } 条目 */
  extractEntries: (args: any) => Array<{ key: string; data: any }>;
}

export const toolTagMappings: ToolTagMapping[] = [
  {
    toolName: 'output_products',
    tagName: 'ProductList',
    tagAttribute: 'data-key',
    description: '展示产品列表',
    promptNote: '文本中只写标签，不要输出产品数据的 JSON 代码块。产品数据通过函数调用传递。',
    defaultPlaceholder: [],
    extractEntries: (args) => [{ key: args.dataKey, data: args.products }],
  },
  {
    toolName: 'output_ask_questions',
    tagName: 'Ask',
    tagAttribute: 'data-key',
    description: '提供追问选项',
    promptNote: '文本中只写标签，不要写 text 属性。追问文本通过函数调用传递。',
    defaultPlaceholder: { text: '点击了解详情' },
    extractEntries: (args) =>
      args.questions.map((q: any) => ({ key: q.key, data: { text: q.text } })),
  },
  {
    toolName: 'output_customer_managers',
    tagName: 'CustomerManager',
    tagAttribute: 'data-key',
    description: '展示客户经理卡片',
    promptNote: '根据用户需求决定返回 1 位或 2 位客户经理。文本中只写标签，不要输出客户经理数据的 JSON 代码块。',
    defaultPlaceholder: [],
    extractEntries: (args) => [{ key: args.dataKey, data: args.managers }],
  },
  {
    toolName: 'output_financial_products',
    tagName: 'FinancialProduct',
    tagAttribute: 'data-key',
    description: '展示理财卡片',
    promptNote: '文本中只写标签，不要输出理财数据的 JSON 代码块。理财数据通过函数调用传递。',
    defaultPlaceholder: [],
    extractEntries: (args) => [{ key: args.dataKey, data: args.financialProducts }],
  },
  {
    toolName: 'output_loan_info',
    tagName: 'LoanInfo',
    tagAttribute: 'data-key',
    description: '展示贷款信息',
    promptNote: '文本中只写标签，不要输出贷款信息的 JSON 代码块。贷款数据通过函数调用传递。',
    defaultPlaceholder: [],
    extractEntries: (args) => [{ key: args.dataKey, data: args.loanInfo }],
  },
];

export const chatTools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'get_products',
      description: '获取银行当前提供的所有贷款产品列表。调用此工具获取真实产品数据，然后将数据传递给 output_products 函数进行展示。不要自己编造产品数据，必须通过此工具获取。',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_customer_managers',
      description: '获取银行客户经理列表。调用此工具获取真实的客户经理数据，然后将数据传递给 output_customer_managers 函数进行展示。不要自己编造客户经理数据，必须通过此工具获取。',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_financial_products',
      description: '获取银行理财/基金/定期等金融产品列表。调用此工具获取真实的理财数据，然后将数据传递给 output_financial_products 函数进行展示。不要自己编造理财数据，必须通过此工具获取。',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_loan_info',
      description: '获取用户当前的贷款信息，包括待还日期、金额、笔数和产品标签。调用此工具获取真实的贷款数据，然后将数据传递给 output_loan_info 函数进行展示。不要自己编造贷款数据，必须通过此工具获取。',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'output_products',
      description:
        '【必须调用】当用户询问贷款产品、要求推荐产品时，你必须调用此函数来输出产品数据。调用后必须在回复文本中插入 <ProductList data-key="xxx" /> 标签，data-key 的值必须与函数参数中的 dataKey 完全一致。如果不调用此函数，前端将无法展示产品卡片。',
      parameters: {
        type: 'object',
        properties: {
          dataKey: {
            type: 'string',
            description:
              '8位随机字符串（字母+数字），用于关联 ProductList 标签。生成后必须在回复文本中使用 <ProductList data-key="该值" />',
          },
          products: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', description: '产品唯一标识' },
                name: { type: 'string', description: '产品名称' },
                tag: {
                  type: 'string',
                  description: '产品标签，如 "消费贷"、"经营贷"',
                },
                tagColor: {
                  type: 'string',
                  description: '标签背景色，如 "#FFEBCE"',
                },
                tagTextColor: {
                  type: 'string',
                  description: '标签文字颜色，如 "#C85930"',
                },
                maxAmount: {
                  type: 'string',
                  description: '最高可借额度，如 "200,000"',
                },
                rate: {
                  type: 'string',
                  description: '利率说明，如 "最低年化利率(单利)3.2%起"',
                },
              },
              required: ['id', 'name', 'tag', 'maxAmount', 'rate'],
            },
          },
        },
        required: ['dataKey', 'products'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'output_ask_questions',
      description:
        '【必须调用】当需要提供继续问的追问选项时，你必须调用此函数来输出追问问题。调用后必须在回复文本中插入 <Ask data-key="xxx" /> 标签，data-key 的值必须与函数参数中对应 question 的 key 完全一致。如果不调用此函数，前端将无法渲染追问按钮。',
      parameters: {
        type: 'object',
        properties: {
          questions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                key: {
                  type: 'string',
                  description:
                    '8位随机字符串（字母+数字），用于关联 Ask 标签。生成后必须在回复文本中使用 <Ask data-key="该值" />',
                },
                text: {
                  type: 'string',
                  description: '追问问题文本，如 "怎么申请借款"',
                },
              },
              required: ['key', 'text'],
            },
          },
        },
        required: ['questions'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'output_customer_managers',
      description:
        '【必须调用】当用户询问客户经理、需要推荐客户经理时，你必须调用此函数来输出客户经理数据。根据用户需求决定返回 1 位或 2 位客户经理。调用后必须在回复文本中插入 <CustomerManager data-key="xxx" /> 标签，data-key 的值必须与函数参数中的 dataKey 完全一致。如果不调用此函数，前端将无法展示客户经理卡片。',
      parameters: {
        type: 'object',
        properties: {
          dataKey: {
            type: 'string',
            description:
              '8位随机字符串（字母+数字），用于关联 CustomerManager 标签。生成后必须在回复文本中使用 <CustomerManager data-key="该值" />',
          },
          managers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', description: '客户经理唯一标识' },
                name: { type: 'string', description: '客户经理姓名，如 "邓经理"' },
                productName: { type: 'string', description: '负责的产品名称，如 "希望贷-消费贷"' },
                productTag: { type: 'string', description: '产品分类标签，如 "信用类"' },
                productTagColor: { type: 'string', description: '标签背景色，如 "#E7EFFE"' },
                productTagTextColor: { type: 'string', description: '标签文字颜色，如 "#407FFF"' },
                unit: { type: 'string', description: '所属单位名称' },
                phone: { type: 'string', description: '联系电话' },
              },
              required: ['id', 'name', 'productName', 'productTag', 'unit', 'phone'],
            },
          },
        },
        required: ['dataKey', 'managers'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'output_financial_products',
      description:
        '【必须调用】当用户询问理财、基金、定期等金融产品时，你必须调用此函数来输出理财数据。调用后必须在回复文本中插入 <FinancialProduct data-key="xxx" /> 标签，data-key 的值必须与函数参数中的 dataKey 完全一致。如果不调用此函数，前端将无法展示理财卡片。',
      parameters: {
        type: 'object',
        properties: {
          dataKey: {
            type: 'string',
            description:
              '8位随机字符串（字母+数字），用于关联 FinancialProduct 标签。生成后必须在回复文本中使用 <FinancialProduct data-key="该值" />',
          },
          financialProducts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', description: '理财唯一标识' },
                name: { type: 'string', description: '产品名称，如 "理财"、"基金"、"定期"' },
                totalAmount: { type: 'string', description: '总金额，如 "¥9,525.32"' },
                yesterdayProfit: { type: 'string', description: '昨日收益，如 "-¥95.32"' },
                yesterdayProfitColor: { type: 'string', description: '昨日收益颜色，如 "#3EA851"（绿色）或 "#DF3020"（红色）' },
                totalProfit: { type: 'string', description: '累计收益，如 "+¥2,534.32"' },
                totalProfitColor: { type: 'string', description: '累计收益颜色，如 "#DF3020"（红色）或 "#3EA851"（绿色）' },
              },
              required: ['id', 'name', 'totalAmount', 'yesterdayProfit', 'totalProfit'],
            },
          },
        },
        required: ['dataKey', 'financialProducts'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'output_loan_info',
      description:
        '【必须调用】当用户询问我的贷款、待还信息时，你必须调用此函数来输出贷款数据。调用后必须在回复文本中插入 <LoanInfo data-key="xxx" /> 标签，data-key 的值必须与函数参数中的 dataKey 完全一致。如果不调用此函数，前端将无法展示贷款信息卡片。',
      parameters: {
        type: 'object',
        properties: {
          dataKey: {
            type: 'string',
            description:
              '8位随机字符串（字母+数字），用于关联 LoanInfo 标签。生成后必须在回复文本中使用 <LoanInfo data-key="该值" />',
          },
          loanInfo: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', description: '贷款记录唯一标识' },
                dueDate: { type: 'string', description: '待还日期，如 "9月14日"' },
                amount: { type: 'string', description: '待还金额，如 "6031.09"' },
                loanCount: { type: 'number', description: '借款笔数，如 2' },
                tags: {
                  type: 'array',
                  description: '产品标签列表',
                  items: {
                    type: 'object',
                    properties: {
                      name: { type: 'string', description: '标签名称，如 "农户专享贷"' },
                      tagColor: { type: 'string', description: '标签文字颜色，如 "#BD8A00"' },
                      tagBgColor: { type: 'string', description: '标签背景色，如 "rgba(189,138,0,0.10)"' },
                    },
                  },
                },
              },
              required: ['id', 'dueDate', 'amount', 'loanCount', 'tags'],
            },
          },
        },
        required: ['dataKey', 'loanInfo'],
      },
    },
  },
];