// Simplified Sources Integration
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sources integration script loaded');
    
    // Add the Sources tab to navigation if it doesn't exist
    setTimeout(function() {
        if (!document.getElementById('tab-sources')) {
            addSourcesTab();
        }
    }, 500);
});
  
// Function to add the Sources tab
function addSourcesTab() {
    // Find the tabs container
    const tabsContainer = document.querySelector('.tabs-container');
    if (!tabsContainer) {
        console.error('Tabs container not found');
        return;
    }
    
    console.log('Adding Sources tab to navigation');
    
    // Check if the tab already exists
    if (document.getElementById('tab-sources')) {
        console.log('Sources tab already exists');
        return;
    }
    
    // Create the tab button
    const sourcesTab = document.createElement('button');
    sourcesTab.id = 'tab-sources';
    sourcesTab.className = 'tab-button';
    sourcesTab.setAttribute('data-tab', 'sources');
    sourcesTab.textContent = 'Sources';
    
    // Add the tab to the container
    tabsContainer.appendChild(sourcesTab);
    
    // Use the global setupTabs function if available
    if (typeof window.setupTabs === 'function') {
        window.setupTabs();
    } else {
        // Fallback if setupTabs isn't available yet
        addSourcesClickHandler(sourcesTab);
    }
}

// Add click handler for sources tab as a fallback
function addSourcesClickHandler(sourcesTab) {
    sourcesTab.addEventListener('click', function() {
        // Update active tab
        document.querySelectorAll('.tab-button').forEach(tab => {
            tab.classList.remove('active');
        });
        sourcesTab.classList.add('active');
        
        // Load sources content
        loadSourcesContent();
    });
}

// Function to load sources content
function loadSourcesContent() {
    console.log('Loading sources content');
    
    // Get the content area
    const contentArea = document.getElementById('tab-content');
    if (!contentArea) {
        console.error('Content area not found');
        return;
    }
    
    // Clear current content
    contentArea.innerHTML = '';
    
    // Add sources content (direct HTML insertion for reliability)
    contentArea.innerHTML = `
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
  
          <!-- Research Studies & Industry Reports -->
          <div class="card">
              <div class="p-6">
                  <h2 class="text-xl font-semibold mb-4">Research Studies & Industry Reports</h2>
                  <div class="space-y-4">
                      <div class="source-item">
                          <p class="mb-1">GitHub Copilot Impact Study (March 2022)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/" target="_blank">
                                  Research: quantifying GitHub Copilot's impact on developer productivity and happiness
                              </a>
                          </p>
                      </div>
              
                      <div class="source-item">
                          <p class="mb-1">McKinsey Generative AI Research (June 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/unleashing-developer-productivity-with-generative-ai" target="_blank">
                                  Unleashing developer productivity with generative AI
                              </a>
                          </p>
                      </div>
              
                      <div class="source-item">
                          <p class="mb-1">GitClear Analysis on AI Code Quality (August 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://devops.com/ai-in-software-development-productivity-at-the-cost-of-code-quality/" target="_blank">
                                  AI in Software Development: Productivity at the Cost of Code Quality?
                              </a>
                          </p>
                      </div>
              
                      <div class="source-item">
                          <p class="mb-1">Google ML-Enhanced Code Completion Study (July 2022)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://ai.googleblog.com/2022/07/ml-enhanced-code-completion-improves.html" target="_blank">
                                  ML-Enhanced Code Completion Improves Developer Productivity
                              </a>
                          </p>
                      </div>
              
                      <div class="source-item">
                          <p class="mb-1">Microsoft AI ROI Study (February 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://www.coherentsolutions.com/insights/ai-development-cost-estimation-pricing-structure-roi" target="_blank">
                                  AI Development Cost Estimation: Pricing Structure, ROI
                              </a>
                          </p>
                      </div>
              
                      <div class="source-item">
                          <p class="mb-1">Bain & Company AI Productivity Report (November 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://www.bain.com/insights/ai-in-financial-services-survey-shows-productivity-gains-across-the-board/" target="_blank">
                                  AI in Financial Services Survey Shows Productivity Gains Across the Board
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Opsera GitHub Copilot Adoption Report (January 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://www.opsera.io/blog/github-copilot-trends-and-measuring-impact" target="_blank">
                                  GitHub Copilot Trends and Measuring Impact
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Stack Overflow Developer Survey: AI Tools (May 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://survey.stackoverflow.co/2023/#section-ai-tools-ai-tool-usage" target="_blank">
                                  2023 Developer Survey: AI Tools Section
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">AWS Self-Healing Code Framework Study (September 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://aws.amazon.com/blogs/compute/building-self-healing-infrastructure-with-aws-lambda-and-amazon-bedrock/" target="_blank">
                                  Self-Healing Infrastructure with AWS Lambda and AI
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">GitHub Productivity Study on Generative AI (December 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://github.blog/2023-12-06-how-software-teams-are-being-transformed-by-ai/" target="_blank">
                                  How software teams are being transformed by AI
                              </a>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
  
          <!-- Context Windows & Token Management -->
          <div class="card">
              <div class="p-6">
                  <h2 class="text-xl font-semibold mb-4">Context Windows & Token Management</h2>
                  <div class="space-y-4">
                      <div class="source-item">
                          <p class="mb-1">What is a context window? (December 2024)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://www.ibm.com/think/topics/context-window" target="_blank">
                                  IBM Think Blog - Understanding context windows in transformer models
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">GPT-4, 128K context - it is not big enough (January 2024)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://dev.to/maximsaplin/gpt-4-128k-context-it-is-not-big-enough-1h02" target="_blank">
                                  DEV Community - Analysis of GPT-4's extended context limitations
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Long Context RAG Performance of LLMs (September 2024)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://www.databricks.com/blog/long-context-rag-performance-llms" target="_blank">
                                  Databricks Blog - Performance analysis of RAG with large context windows
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Context Window Caching for Managing Context in LLMs (May 2024)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://medium.com/@zbabar/context-window-caching-for-managing-context-in-llms-4eebb6c33b1c" target="_blank">
                                  Medium - Strategies for context window optimization
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Parallel Context Windows for Large Language Models (December 2022)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://arxiv.org/abs/2212.10947" target="_blank">
                                  arXiv - Research on parallel context processing
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Recurrent Context Compression (June 2024)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://arxiv.org/abs/2406.06110" target="_blank">
                                  arXiv - Efficiently Expanding the Context Window of LLM
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">De-Coded: Understanding Context Windows for Transformer Models (January 2024)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://towardsdatascience.com/de-coded-understanding-context-windows-for-transformer-models-cd1baca6427e" target="_blank">
                                  Towards Data Science - Comprehensive guide to context windows
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Scaling Context Windows in Transformers (March 2025)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://www.modular.com/ai-resources/scaling-context-windows-in-transformers-advances-challenges-and-future-prospects" target="_blank">
                                  Modular AI Resources - Advances, Challenges, and Future Prospects
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">What is a context window in AI? (December 2024)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://nebius.com/blog/posts/context-window-in-ai" target="_blank">
                                  Nebius Blog - Understanding its importance in LLMs
                              </a>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
  
          <!-- AI Architecture & Software Development -->
          <div class="card">
              <div class="p-6">
                  <h2 class="text-xl font-semibold mb-4">AI Architecture & Software Development</h2>
                  <div class="space-y-4">
                      <div class="source-item">
                          <p class="mb-1">The Role of AI in Software Architecture (June 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://www.imaginarycloud.com/blog/ai-in-software-architecture" target="_blank">
                                  The Role of AI in Software Architecture: Trends and Innovations
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Transforming SDLC with Generative AI (August 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://aws.amazon.com/blogs/apn/transforming-the-software-development-lifecycle-sdlc-with-generative-ai/" target="_blank">
                                  Transforming the Software Development Lifecycle (SDLC) with Generative AI
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">AI-Generated Mermaid Diagrams (October 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://blog.serverlessadvocate.com/generating-mermaid-syntax-diagrams-with-ai-powered-amazon-bedrock-️-29f8dd1602d3" target="_blank">
                                  Generating Mermaid Syntax Diagrams with AI-powered Amazon Bedrock
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">AI Code Reviews for Compliance (January 2024)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://www.qodo.ai/blog/ai-code-reviews-compliance-coding-standards/" target="_blank">
                                  How AI Code Reviews Ensure Compliance and Enforce Coding Standards
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Globant Code Fixer Agent Whitepaper (November 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://ai.globant.com/wp-content/uploads/2023/11/Whitepaper-Globant-Code-Fixer-Agent.pdf" target="_blank">
                                  Whitepaper - Globant Code Fixer Agent
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Sourcegraph Cody: Understanding Codebases (March 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://sourcegraph.com/blog/how-cody-understands-your-codebase" target="_blank">
                                  How Cody understands your codebase
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">AI-HIPAA Compliance Framework (September 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://trustero.com/resources/blog/redefining-hipaa-compliance-with-ai-powered-assurance" target="_blank">
                                  Redefining HIPAA Compliance with AI-Powered Assurance
                              </a>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
  
          <!-- AI Models & Tools -->
          <div class="card">
              <div class="p-6">
                  <h2 class="text-xl font-semibold mb-4">AI Models & Tools</h2>
                  <div class="space-y-4">
                      <div class="source-item">
                          <p class="mb-1">GitHub Copilot Introduction (June 2021)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://github.blog/2021-06-29-introducing-github-copilot-ai-pair-programmer/" target="_blank">
                                  Introducing GitHub Copilot: Your AI Pair Programmer
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">OpenAI GPT-4 Technical Report (March 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://openai.com/research/gpt-4" target="_blank">
                                  GPT-4 Technical Report
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Anthropic Claude Technical Overview (December 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://www.anthropic.com/claude" target="_blank">
                                  Claude: A Human-Centered AI Assistant
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Claude 3.7 Sonnet Hybrid Reasoning Model (February 2025)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://aws.amazon.com/blogs/aws/anthropics-claude-3-7-sonnet-the-first-hybrid-reasoning-model-is-now-available-in-amazon-bedrock/" target="_blank">
                                  Anthropic's Claude 3.7 Sonnet: The First Hybrid Reasoning Model in Amazon Bedrock
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Amazon CodeGuru Overview (December 2022)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://aws.amazon.com/codeguru/" target="_blank">
                                  Amazon CodeGuru - Automated Code Reviews and Application Performance
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Tabnine AI Coding Assistant (April 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://www.tabnine.com/" target="_blank">
                                  Tabnine - AI Code Completion and Chat
                              </a>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
  
          <!-- Foundational Ideas & Learning Resources -->
          <div class="card">
              <div class="p-6">
                  <h2 class="text-xl font-semibold mb-4">Foundational Ideas & Learning Resources</h2>
                  <div class="space-y-4">
                      <div class="source-item">
                          <p class="mb-1">Karpathy's Software 2.0 (April 2017)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="http://karpathy.github.io/2017/04/25/software-2/" target="_blank">
                                  Software 2.0
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Fast.ai Deep Learning Course (2020-2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://course.fast.ai/" target="_blank">
                                  Deep Learning for Coders
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Generative Deep Learning Book (June 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://www.oreilly.com/library/view/generative-deep-learning/9781492041931/" target="_blank">
                                  Generative Deep Learning: Teaching Machines to Paint, Write, Compose, and Play
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Hugging Face Course (September 2022)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://huggingface.co/learn/nlp-course/chapter1/1" target="_blank">
                                  Hugging Face NLP Course
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">AI for Everyone (February 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://www.deeplearning.ai/courses/ai-for-everyone/" target="_blank">
                                  AI For Everyone by Andrew Ng
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Matt Welsh's AI Perspective (February 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://mdwdotla.medium.com/hey-lets-fire-all-the-devs-and-replace-them-with-ai-8a0c3011d12" target="_blank">
                                  Hey, let's fire all the devs and replace them with AI!
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Prompt Engineering for Developers (March 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://github.com/openai/openai-cookbook/blob/main/guides/prompt-engineering.md" target="_blank">
                                  OpenAI Cookbook: Prompt Engineering Guide
                              </a>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
  
          <!-- Books (2023-2025) -->
          <div class="card">
              <div class="p-6">
                  <h2 class="text-xl font-semibold mb-4">Books (2023-2025)</h2>
                  <div class="space-y-4">
                      <div class="source-item">
                          <p class="mb-1">The AI-Native Enterprise (January 2025)</p>
                          <p class="text-sm">Author: Adam Tornhill</p>
                          <p class="text-sm">Title: The AI-Native Enterprise: How AI is Transforming the Software Development Lifecycle</p>
                          <p class="text-sm">Publisher: Pearson | ISBN: 978-0136554363</p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Effective System Design with LLMs (October 2024)</p>
                          <p class="text-sm">Author: Chip Huyen</p>
                          <p class="text-sm">Title: Effective System Design with Large Language Models</p>
                          <p class="text-sm">Publisher: Manning Publications | ISBN: 978-1617297243</p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Generative AI for Software Engineering (July 2024)</p>
                          <p class="text-sm">Author: Simon Willison</p>
                          <p class="text-sm">Title: Generative AI for Software Engineering: From Concepts to Implementation</p>
                          <p class="text-sm">Publisher: O'Reilly Media | ISBN: 978-1492089094</p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">AI Patterns and Practices (March 2024)</p>
                          <p class="text-sm">Authors: Peter Norvig & Cassie Kozyrkov</p>
                          <p class="text-sm">Title: AI Patterns and Practices: Enterprise-Ready AI Development</p>
                          <p class="text-sm">Publisher: Addison-Wesley Professional | ISBN: 978-0137568925</p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">The Practical Guide to AI Software Development (August 2023)</p>
                          <p class="text-sm">Author: Emmanuel Ameisen</p>
                          <p class="text-sm">Title: The Practical Guide to AI Software Development</p>
                          <p class="text-sm">Publisher: No Starch Press | ISBN: 978-1718502079</p>
                      </div>
                  </div>
              </div>
          </div>
  
          <!-- Case Studies & Implementation Examples -->
          <div class="card">
              <div class="p-6">
                  <h2 class="text-xl font-semibold mb-4">Case Studies & Implementation Examples</h2>
                  <div class="space-y-4">
                      <div class="source-item">
                          <p class="mb-1">Amazon's Large-Scale Refactoring (November 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://amazon.science/blog/automated-refactoring-at-scale-lessons-from-amazon" target="_blank">
                                  Automated Refactoring at Scale: Lessons from Amazon
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Facebook (Meta) - Automated Debugging (September 2022)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://engineering.fb.com/2018/09/13/android/finding-and-fixing-software-bugs-automatically-with-sapfix-and-sapienz/" target="_blank">
                                  Sapienz and SapFix: Automated End-to-End Testing and Bug-Fixing
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Luminare Healthcare Startup Case Study (February 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://codescene.com/blog/case-study-luminare" target="_blank">
                                  How Luminare Used AI-Assisted Code Analysis to Transform Technical Debt
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Harness AI Deployment Verification (August 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://harness.io/blog/continuous-verification/ai-driven-verification" target="_blank">
                                  AI-Driven Continuous Delivery: Automating Deployment Verification
                              </a>
                          </p>
                      </div>
  
                      <div class="source-item">
                          <p class="mb-1">Microsoft Azure AI-Enhanced DevOps (December 2023)</p>
                          <p class="text-sm text-blue-600 hover:underline">
                              <a href="https://azure.microsoft.com/en-us/blog/aienhanced-devops-from-code-to-production/" target="_blank">
                                  AI-Enhanced DevOps: From Code to Production
                              </a>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    `;
    
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
          
          // Show/hide sections based on content
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
    }, 200);
    
    // Add styles for sources
    if (!document.getElementById('sources-styles')) {
      const style = document.createElement('style');
      style.id = 'sources-styles';
      style.textContent = `
        /* Styles for Sources Tab */
        .source-item {
          padding: 0.75rem;
          border-radius: 0.375rem;
          border: 1px solid #e5e7eb;
          background-color: #f9fafb;
          transition: all 0.2s ease;
          margin-bottom: 1rem;
        }
  
        .source-item:hover {
          background-color: #f3f4f6;
          border-color: #d1d5db;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
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
          background-color: #2a2a2a;
          border-color: #444444;
        }
  
        body.dark-theme .source-item:hover {
          background-color: #333333;
        }
  
        body.dark-theme .source-item a {
          color: #60a5fa;
        }
  
        body.dark-theme #sources-search {
          background-color: #2a2a2a;
          color: #e0e0e0;
        }
  
        body.dark-theme .sources-tab .flex.items-center.border.rounded-lg {
          background-color: #2a2a2a;
          border-color: #444444;
        }
      `;
      document.head.appendChild(style);
    }
  }