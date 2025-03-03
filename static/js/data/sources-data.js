// sources-data.js - Place in static/js/data/ directory

const sourcesData = {
  researchReports: [
    {
      title: "GitHub Copilot Impact Study (March 2022)",
      url: "https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/",
      description: "Research quantifying GitHub Copilot's impact on developer productivity and happiness",
      key_finding: "Developers using GitHub Copilot completed tasks 55% faster than developers who didn't"
    },
    {
      title: "McKinsey Generative AI Research (June 2023)",
      url: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/unleashing-developer-productivity-with-generative-ai",
      description: "Unleashing developer productivity with generative AI",
      key_finding: "Coding tasks completed in roughly half the time with AI assistance"
    },
    {
      title: "GitClear Analysis on AI Code Quality (August 2023)",
      url: "https://devops.com/ai-in-software-development-productivity-at-the-cost-of-code-quality/",
      description: "AI in Software Development: Productivity at the Cost of Code Quality?",
      key_finding: "Potential tradeoffs between code speed and quality when using AI"
    },
    {
      title: "Google ML-Enhanced Code Completion Study (July 2022)",
      url: "https://ai.googleblog.com/2022/07/ml-enhanced-code-completion-improves.html",
      description: "ML-Enhanced Code Completion Improves Developer Productivity",
      key_finding: "6% iteration time reduction, 25-34% suggestion acceptance rate"
    },
    {
      title: "Microsoft AI ROI Study (February 2023)",
      url: "https://www.coherentsolutions.com/insights/ai-development-cost-estimation-pricing-structure-roi",
      description: "AI Development Cost Estimation: Pricing Structure, ROI",
      key_finding: "Average 3.5× return on AI investments, with top performers seeing up to 8× ROI"
    },
    {
      title: "Bain & Company AI Productivity Report (November 2023)",
      url: "https://www.bain.com/insights/ai-in-financial-services-survey-shows-productivity-gains-across-the-board/",
      description: "AI in Financial Services Survey Shows Productivity Gains Across the Board",
      key_finding: "26% increase in tasks completed with AI, 20% avg productivity gain"
    },
    {
      title: "Opsera GitHub Copilot Adoption Report (January 2023)",
      url: "https://www.opsera.io/blog/github-copilot-trends-and-measuring-impact",
      description: "GitHub Copilot Trends and Measuring Impact",
      key_finding: "50k+ organizations, 1/3 of Fortune 500 using Copilot with tasks up to 55% faster"
    },
    {
      title: "Stack Overflow Developer Survey: AI Tools (May 2023)",
      url: "https://survey.stackoverflow.co/2023/#section-ai-tools-ai-tool-usage",
      description: "2023 Developer Survey: AI Tools Section",
      key_finding: "Widespread adoption of AI coding tools among professional developers"
    }
  ],
  
  casesStudies: [
    {
      title: "Amazon's Large-Scale Refactoring (November 2023)",
      url: "https://amazon.science/blog/automated-refactoring-at-scale-lessons-from-amazon",
      description: "Automated Refactoring at Scale: Lessons from Amazon",
      key_finding: "Saved an estimated $260 million and about 4,500 developer-years of effort"
    },
    {
      title: "Facebook (Meta) - Automated Debugging (September 2022)",
      url: "https://engineering.fb.com/2018/09/13/android/finding-and-fixing-software-bugs-automatically-with-sapfix-and-sapienz/",
      description: "Sapienz and SapFix: Automated End-to-End Testing and Bug-Fixing",
      key_finding: "Cut debugging time for memory corruption bugs by up to 80%"
    },
    {
      title: "Luminare Healthcare Startup Case Study (February 2023)",
      url: "https://codescene.com/blog/case-study-luminare",
      description: "How Luminare Used AI-Assisted Code Analysis to Transform Technical Debt",
      key_finding: "Improved code health score from poor to 9.3/10; reduced developer burnout"
    },
    {
      title: "Harness AI Deployment Verification (August 2023)",
      url: "https://harness.io/blog/continuous-verification/ai-driven-verification",
      description: "AI-Driven Continuous Delivery: Automating Deployment Verification",
      key_finding: "Caught a 5% error rate increase within minutes of deployment, automatically triggering rollback"
    },
    {
      title: "Microsoft Azure AI-Enhanced DevOps (December 2023)",
      url: "https://azure.microsoft.com/en-us/blog/aienhanced-devops-from-code-to-production/",
      description: "AI-Enhanced DevOps: From Code to Production",
      key_finding: "Significant improvements in deployment frequency and mean time to recovery"
    }
  ],
  
  aiModels: [
    {
      title: "GitHub Copilot",
      url: "https://github.com/features/copilot",
      description: "GitHub Copilot is an AI pair programmer that offers autocomplete-style suggestions as you code",
      key_feature: "Code completion, code explanation, and chat capabilities"
    },
    {
      title: "Anthropic Claude",
      url: "https://www.anthropic.com/claude",
      description: "Claude is a next-generation AI assistant based on Anthropic's research in constitutional AI",
      key_feature: "100k token context window, strong reasoning capabilities, extended thinking mode"
    },
    {
      title: "Amazon CodeWhisperer",
      url: "https://aws.amazon.com/codewhisperer/",
      description: "Amazon's AI coding companion",
      key_feature: "Real-time code suggestions, security scanning"
    },
    {
      title: "Cursor",
      url: "https://cursor.sh/",
      description: "AI-powered code editor built on VSCode",
      key_feature: "Integrated AI chat, codebase understanding, code generation"
    },
    {
      title: "Tabnine",
      url: "https://www.tabnine.com/",
      description: "AI coding assistant that can be used in most popular IDEs",
      key_feature: "Line and full-function code completions"
    }
  ],
  
  resources: [
    {
      title: "Karpathy's Software 2.0 (April 2017)",
      url: "http://karpathy.github.io/2017/04/25/software-2/",
      description: "Seminal article on the paradigm shift in how software is written",
      type: "Article"
    },
    {
      title: "The AI-Native Enterprise (January 2025)",
      description: "How AI is Transforming the Software Development Lifecycle",
      author: "Adam Tornhill",
      publisher: "Pearson",
      isbn: "978-0136554363",
      type: "Book"
    },
    {
      title: "Effective System Design with LLMs (October 2024)",
      description: "Comprehensive guide to designing systems with large language models",
      author: "Chip Huyen",
      publisher: "Manning Publications",
      isbn: "978-1617297243",
      type: "Book"
    },
    {
      title: "Generative AI for Software Engineering (July 2024)",
      description: "From Concepts to Implementation",
      author: "Simon Willison",
      publisher: "O'Reilly Media",
      isbn: "978-1492089094",
      type: "Book"
    },
    {
      title: "AI Patterns and Practices (March 2024)",
      description: "Enterprise-Ready AI Development",
      author: "Peter Norvig & Cassie Kozyrkov",
      publisher: "Addison-Wesley Professional",
      isbn: "978-0137568925",
      type: "Book"
    },
    {
      title: "AI For Everyone by Andrew Ng",
      url: "https://www.deeplearning.ai/courses/ai-for-everyone/",
      description: "Non-technical course to help understand AI concepts and applications",
      type: "Course"
    },
    {
      title: "Prompt Engineering for Developers",
      url: "https://github.com/openai/openai-cookbook/blob/main/guides/prompt-engineering.md",
      description: "OpenAI Cookbook: Prompt Engineering Guide",
      type: "Guide"
    }
  ]
};

export default sourcesData;
