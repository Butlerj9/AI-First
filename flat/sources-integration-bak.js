// sources-integration.js - Add this file to your project and include it in your HTML

// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // First, inject the template and styles
  injectSourcesContent();
  
  // Then add the tab to the navigation
  setTimeout(addSourcesTab, 100);
});

// Function to inject the template and CSS
function injectSourcesContent() {
  // Add the template to the DOM
  const templateHTML = `
<!-- Sources Tab Template -->
<template id="sources-template">
    <div class="flex flex-col gap-6 sources-tab">
        <div class="text-center mb-4">
            <h1 class="text-2xl font-bold">Sources & References</h1>
            <p class="text-lg text-gray-600">Academic and industry sources supporting AI-First development methodologies</p>
        </div>

        <div class="mb-6">
          <div class="flex items-center border rounded-lg p-2 bg-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-400 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input id="sources-search" type="text" placeholder="Search sources..." class="w-full outline-none text-gray-700" />
          </div>
        </div>

        <div class="card">
            <div class="p-6">
                <h2 class="text-xl font-semibold mb-4">Research Studies & Industry Reports</h2>
                <div class="space-y-4">
                    <div class="source-item">
                        <p class="mb-1">GitHub Copilot studies on productivity and developer satisfaction</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/" target="_blank">
                                Research: quantifying GitHub Copilot's impact on developer productivity and happiness - The GitHub Blog
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">McKinsey research on generative AI speed gains (50%+ faster coding, marginal quality improvement)</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/unleashing-developer-productivity-with-generative-ai" target="_blank">
                                Unleash developer productivity with generative AI | McKinsey
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">GitClear analysis on code quality trends with AI (rising churn, copy-paste code)</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://devops.com/ai-in-software-development-productivity-at-the-cost-of-code-quality/" target="_blank">
                                AI in Software Development: Productivity at the Cost of Code Quality? - DevOps.com
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">Google's internal assessment of ML code completion (6% iteration time reduction, 25-34% suggestion acceptance)</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://ai.googleblog.com/2022/07/ml-enhanced-code-completion-improves.html" target="_blank">
                                ML-Enhanced Code Completion Improves Developer Productivity
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">Bastaki Software – ROI of AI development tools (30–50% coding time reduction)</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://bastakiss.com/blog/news-2/the-roi-of-ai-based-software-development-tool-556" target="_blank">
                                The ROI of AI-Based Software Development Tool | Bastaki Software Solutions
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">Microsoft's AI ROI study (average 3.5× return on AI investments)</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://www.coherentsolutions.com/insights/ai-development-cost-estimation-pricing-structure-roi" target="_blank">
                                AI Development Cost Estimation: Pricing Structure, ROI
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">Brainhub EU – Impact of AI on dev roles (quotes from Oak Ridge research, Nadella, Jeff Dean)</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://brainhub.eu/library/software-developer-age-of-ai" target="_blank">
                                Is There a Future for Software Engineers? The Impact of AI [2024]
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">Opsera report – Copilot adoption (50k orgs, 1/3 of Fortune 500) and benefits (tasks up to 55% faster)</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://www.opsera.io/blog/github-copilot-trends-and-measuring-impact" target="_blank">
                                GitHub Copilot Trends and Measuring Impact | Opsera
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">Bain & Co. survey – 26% increase in tasks completed with AI, 20% avg productivity gain</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://www.bain.com/insights/ai-in-financial-services-survey-shows-productivity-gains-across-the-board/" target="_blank">
                                AI in Financial Services Survey Shows Productivity Gains Across the Board | Bain & Company
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">Globant "Code Fixer" whitepaper – multi-agent debugging loop (Architect, Editor, Critic roles)</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://ai.globant.com/wp-content/uploads/2024/11/Whitepaper-Globant-Code-Fixer-Agent.pdf" target="_blank">
                                Whitepaper - Globant Code Fixer Agent
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">Sourcegraph Cody blog – context retrieval and chunking for large codebases</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://sourcegraph.com/blog/how-cody-understands-your-codebase" target="_blank">
                                How Cody understands your codebase | Sourcegraph Blog
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">StackExchange discussion on LOC/day productivity</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://softwareengineering.stackexchange.com/questions/450695/where-did-the-quote-or-study-of-developers-write-10-lines-of-code-per-day-come-f" target="_blank">
                                Where did the quote or study of developers write 10 lines of code per day come from? - Software Engineering Stack Exchange
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">Matt Welsh's perspective on AI (10,000× speed/effort hypothetical)</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://mdwdotla.medium.com/hey-lets-fire-all-the-devs-and-replace-them-with-ai-8a0c3011d12" target="_blank">
                                Hey, let's fire all the devs and replace them with AI! - Matt Welsh
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="p-6">
                <h2 class="text-xl font-semibold mb-4">AI Architecture & Software Development</h2>
                <div class="space-y-4">
                    <div class="source-item">
                        <p class="mb-1">The Role of AI in Software Architecture: Trends and Innovations</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://www.imaginarycloud.com/blog/ai-in-software-architecture" target="_blank">
                                Imaginary Cloud - AI in Software Architecture
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">Transforming the Software Development Lifecycle (SDLC) with Generative AI</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://aws.amazon.com/blogs/apn/transforming-the-software-development-lifecycle-sdlc-with-generative-ai/" target="_blank">
                                AWS Partner Network Blog
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">Generating Mermaid Syntax Diagrams with AI-powered Amazon Bedrock</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://blog.serverlessadvocate.com/generating-mermaid-syntax-diagrams-with-ai-powered-amazon-bedrock-%EF%B8%8F-29f8dd1602d3" target="_blank">
                                Serverless Advocate - Medium
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">How AI Code Reviews Ensure Compliance and Enforce Coding Standards</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://www.qodo.ai/blog/ai-code-reviews-compliance-coding-standards/" target="_blank">
                                Qodo Blog
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="p-6">
                <h2 class="text-xl font-semibold mb-4">AI Models & Tools</h2>
                <div class="space-y-4">
                    <div class="source-item">
                        <p class="mb-1">GitHub Copilot – Your AI Pair Programmer</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://github.blog/2021-06-29-introducing-github-copilot-ai-pair-programmer/" target="_blank">
                                GitHub Blog - Introducing GitHub Copilot: Your AI Pair Programmer
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">OpenAI – GPT-4 Technical Report</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://openai.com/research/gpt-4" target="_blank">
                                OpenAI Research
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">Anthropic – Claude</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://www.anthropic.com/claude" target="_blank">
                                Anthropic - Claude
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">Anthropic's Claude 3.7 Sonnet hybrid reasoning model</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://aws.amazon.com/blogs/aws/anthropics-claude-3-7-sonnet-the-first-hybrid-reasoning-model-is-now-available-in-amazon-bedrock/" target="_blank">
                                AWS News Blog
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">Anthropic Claude - AI Vendor Risk Profile</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://www.credo.ai/ai-vendor-directory/anthropic-claude" target="_blank">
                                Credo AI
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">Amazon CodeGuru</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://aws.amazon.com/codeguru/" target="_blank">
                                Amazon Web Services
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="p-6">
                <h2 class="text-xl font-semibold mb-4">Books, Articles & Learning Resources</h2>
                <div class="space-y-4">
                    <div class="source-item">
                        <p class="mb-1">Karpathy, Andrej – Software 2.0</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="http://karpathy.github.io/2017/04/25/software-2/" target="_blank">
                                Karpathy.github.io - Software 2.0
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">Fast.ai – Deep Learning for Coders</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://course.fast.ai/" target="_blank">
                                Fast.ai
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">Foster, David – Generative Deep Learning</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="https://www.oreilly.com/library/view/generative-deep-learning/9781492041931/" target="_blank">
                                O'Reilly Media
                            </a>
                        </p>
                    </div>

                    <div class="source-item">
                        <p class="mb-1">AI-Powered HIPAA Compliance: Streamline Audits & Enhance Security</p>
                        <p class="text-sm text-blue-600 hover:underline">
                            <a href="http://trustero.com/resources/blog/redefining-hipaa-compliance-with-ai-powered-assurance" target="_blank">
                                Trustero Blog
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  `;
  
  // Create a div to hold the template
  const tempContainer = document.createElement('div');
  tempContainer.style.display = 'none';
  tempContainer.innerHTML = templateHTML;
  document.body.appendChild(tempContainer);
  
  // Add the CSS styles
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    /* Styles for Sources Tab */
    .source-item {
      padding: 0.75rem;
      border-radius: 0.375rem;
      border: 1px solid #e5e7eb;
      background-color: #f9fafb;
      transition: all 0.2s ease;
    }

    .source-item:hover {
      background-color: #f3f4f6;
      border-color: #d1d5db;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .sources-tab .card {
      transition: box-shadow 0.3s ease;
    }

    .sources-tab .card:hover {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    #sources-search {
      border: none;
      padding: 0.5rem;
      width: 100%;
      font-size: 0.875rem;
    }

    #sources-search:focus {
      outline: none;
    }

    .sources-tab .card h2 {
      position: relative;
      padding-left: 1rem;
    }

    .sources-tab .card h2::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.25rem;
      bottom: 0.25rem;
      width: 4px;
      background-color: #3b82f6;
      border-radius: 2px;
    }

    /* Dark mode adjustments */
    body.dark-theme .source-item {
      background-color: var(--bg-secondary, #2a2a2a);
      border-color: var(--border-color, #444444);
    }

    body.dark-theme .source-item:hover {
      background-color: var(--bg-tertiary, #333333);
    }

    body.dark-theme .source-item a {
      color: var(--accent-tertiary, #60a5fa);
    }

    body.dark-theme #sources-search {
      background-color: var(--bg-secondary, #2a2a2a);
      color: var(--text-primary, #e0e0e0);
    }
  `;
  document.head.appendChild(styleElement);
  
  console.log('Sources template and styles injected');
}

// Function to add sources tab to navigation
function addSourcesTab() {
  // Find the tabs container
  const tabsContainer = document.querySelector('.tabs-container');
  if (!tabsContainer) {
    console.error('Tabs container not found');
    return;
  }
  
  // Check if the sources tab already exists
  if (document.getElementById('tab-sources')) {
    console.log('Sources tab already exists');
    return;
  }
  
  // Create the sources tab button
  const sourcesTab = document.createElement('button');
  sourcesTab.id = 'tab-sources';
  sourcesTab.className = 'tab-button';
  sourcesTab.setAttribute('data-tab', 'sources');
  sourcesTab.textContent = 'Sources';
  
  // Add it to the tabs container
  tabsContainer.appendChild(sourcesTab);
  
  // Add the click handler
  sourcesTab.addEventListener('click', function() {
    // Get all tab buttons and remove active class
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));
    
    // Add active class to this tab
    sourcesTab.classList.add('active');
    
    // Load the sources tab content
    loadSourcesTabContent();
  });
  
  console.log('Sources tab added to navigation');
}

// Function to load sources tab content
function loadSourcesTabContent() {
  // Get the tab content area
  const contentArea = document.getElementById('tab-content');
  if (!contentArea) {
    console.error('Tab content area not found');
    return;
  }
  
  // Clear current content
  contentArea.innerHTML = '';
  
  // Get the sources template
  const template = document.getElementById('sources-template');
  if (!template) {
    contentArea.innerHTML = '<div class="p-8 text-center">Sources template not found</div>';
    return;
  }
  
  // Clone template content
  const content = template.content.cloneNode(true);
  contentArea.appendChild(content);
  
  // Set up search functionality
  setTimeout(function() {
    const searchInput = document.getElementById('sources-search');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const sourceItems = document.querySelectorAll('.source-item');
        
        sourceItems.forEach(item => {
          const text = item.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
        
        // Hide empty cards
        document.querySelectorAll('.card').forEach(card => {
          const visibleItems = card.querySelectorAll('.source-item[style="display: block"]').length;
          const hiddenItems = card.querySelectorAll('.source-item[style="display: none"]').length;
          const totalItems = visibleItems + hiddenItems;
          
          if (visibleItems === 0 && totalItems > 0) {
            card.style.display = 'none';
          } else {
            card.style.display = 'block';
          }
        });
      });
    }
  }, 100);
  
  console.log('Sources tab content loaded');
}

// Function to check if the setupTabs function already exists and modify it
function patchSetupTabs() {
  if (typeof window.setupTabs === 'function') {
    const originalSetupTabs = window.setupTabs;
    window.setupTabs = function() {
      originalSetupTabs();
      addSourcesTab();
    };
    console.log('Patched setupTabs function');
  }
}

// Try to patch the setupTabs function if it exists
patchSetupTabs();
