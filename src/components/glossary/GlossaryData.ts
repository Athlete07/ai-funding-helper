
// Define the glossary term type
export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: 'investing' | 'banking' | 'insurance' | 'taxes' | 'retirement' | 'general';
  level: 'beginner' | 'intermediate' | 'advanced';
}

// Sample glossary data
export const glossaryData: GlossaryTerm[] = [
  {
    id: '1',
    term: 'APR (Annual Percentage Rate)',
    definition: 'The yearly interest rate charged on borrowed money. This rate includes fees and other costs associated with making the loan. It helps consumers compare loan costs on an equitable basis.',
    category: 'banking',
    level: 'beginner'
  },
  {
    id: '2',
    term: 'Asset Allocation',
    definition: 'The process of dividing investments among different kinds of assets, such as stocks, bonds, and cash, to optimize the risk/reward trade-off based on an individual's specific situation and goals.',
    category: 'investing',
    level: 'intermediate'
  },
  {
    id: '3',
    term: 'Bull Market',
    definition: 'A financial market in which prices are rising or expected to rise. This term is most often used to refer to the stock market but can be applied to anything that is traded, such as bonds, real estate, currencies, and commodities.',
    category: 'investing',
    level: 'beginner'
  },
  {
    id: '4',
    term: 'Bear Market',
    definition: 'A market condition in which the prices of securities are falling, and widespread pessimism causes the negative sentiment to be self-sustaining. Generally, a bear market occurs when a broad market index falls by 20% or more over at least a two-month period.',
    category: 'investing',
    level: 'beginner'
  },
  {
    id: '5',
    term: 'Compound Interest',
    definition: 'Interest calculated on the initial principal and also on the accumulated interest of previous periods. Compound interest can be thought of as "interest on interest," and will make a sum grow at a faster rate than simple interest.',
    category: 'banking',
    level: 'beginner'
  },
  {
    id: '6',
    term: 'Diversification',
    definition: 'A risk management strategy that mixes a wide variety of investments within a portfolio. The rationale behind this technique is that a portfolio constructed of different kinds of assets will, on average, yield higher long-term returns and lower the risk of any individual holding or security.',
    category: 'investing',
    level: 'intermediate'
  },
  {
    id: '7',
    term: 'ETF (Exchange-Traded Fund)',
    definition: 'A type of investment fund and exchange-traded product, ETFs are traded on stock exchanges. They can be structured to track anything from the price of an individual commodity to a large and diverse collection of securities. ETFs are similar to mutual funds, except they can be bought and sold throughout the trading day like stocks.',
    category: 'investing',
    level: 'intermediate'
  },
  {
    id: '8',
    term: 'FICO Score',
    definition: 'A credit score created by the Fair Isaac Corporation. Lenders use borrowers\' FICO scores along with other details on borrowers\' credit reports to assess credit risk and determine whether to extend credit.',
    category: 'banking',
    level: 'beginner'
  },
  {
    id: '9',
    term: 'IRA (Individual Retirement Account)',
    definition: 'A tax-advantaged investing tool that individuals use to earmark funds for retirement savings. There are several types of IRAs: Traditional IRAs, Roth IRAs, SIMPLE IRAs, and SEP IRAs.',
    category: 'retirement',
    level: 'beginner'
  },
  {
    id: '10',
    term: 'Liquidity',
    definition: 'The degree to which an asset or security can be quickly bought or sold in the market without affecting the asset\'s price. Cash is considered the most liquid asset, while real estate, fine art, and collectibles are relatively illiquid.',
    category: 'investing',
    level: 'intermediate'
  },
  {
    id: '11',
    term: 'Mutual Fund',
    definition: 'An investment vehicle made up of a pool of funds collected from many investors for the purpose of investing in securities such as stocks, bonds, money market instruments, and other assets.',
    category: 'investing',
    level: 'beginner'
  },
  {
    id: '12',
    term: 'Net Worth',
    definition: 'The value of all assets, minus the total of all liabilities. Put another way, net worth is what is owned minus what is owed.',
    category: 'general',
    level: 'beginner'
  },
  {
    id: '13',
    term: 'P/E Ratio (Price-to-Earnings Ratio)',
    definition: 'A valuation ratio of a company\'s current share price compared to its per-share earnings. In general, a high P/E suggests that investors are expecting higher earnings growth in the future compared to companies with a lower P/E.',
    category: 'investing',
    level: 'advanced'
  },
  {
    id: '14',
    term: '401(k)',
    definition: 'A retirement savings plan sponsored by an employer. It lets workers save and invest a piece of their paycheck before taxes are taken out. Taxes aren\'t paid until the money is withdrawn from the account.',
    category: 'retirement',
    level: 'beginner'
  },
  {
    id: '15',
    term: 'Tax Deduction',
    definition: 'An expense that can be subtracted from gross income to reduce the total amount of income subject to tax. Examples include mortgage interest, charitable donations, and certain business expenses.',
    category: 'taxes',
    level: 'beginner'
  },
  {
    id: '16',
    term: 'Term Life Insurance',
    definition: 'A type of life insurance that guarantees payment of a stated death benefit during a specified term. Once the term expires, the policyholder can either renew it for another term, convert the policy to permanent coverage, or allow the policy to terminate.',
    category: 'insurance',
    level: 'beginner'
  },
  {
    id: '17',
    term: 'Yield',
    definition: 'The income returned on an investment, such as the interest or dividends received from holding a particular security. The yield is usually expressed as an annual percentage rate based on the investment\'s cost, current market value, or face value.',
    category: 'investing',
    level: 'intermediate'
  },
  {
    id: '18',
    term: 'Zero-Based Budgeting',
    definition: 'A method of budgeting in which all expenses must be justified for each new period. The process of zero-based budgeting starts from a "zero base," and every function within an organization is analyzed for its needs and costs.',
    category: 'general',
    level: 'intermediate'
  },
  {
    id: '19',
    term: 'Amortization',
    definition: 'The paying off of debt with a fixed repayment schedule in regular installments over a period of time. Mortgage loans and car loans are examples of amortizing loans.',
    category: 'banking',
    level: 'intermediate'
  },
  {
    id: '20',
    term: 'Capital Gains',
    definition: 'An increase in the value of a capital asset when it\'s sold. When you sell the asset, the difference between the amount you paid for the asset and the amount you sold it for is the capital gain (or capital loss if you sold it for less than you paid).',
    category: 'taxes',
    level: 'intermediate'
  }
];
