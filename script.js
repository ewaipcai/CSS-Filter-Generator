document.addEventListener('DOMContentLoaded', function() {
    // Dark mode functionality
    const toggleSwitch = document.querySelector('#checkbox');
    const html = document.querySelector('html');

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    toggleSwitch.checked = currentTheme === 'dark';

    // Handle theme switch
    toggleSwitch.addEventListener('change', function(e) {
        if (e.target.checked) {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    const form = document.getElementById('promptForm');
    const toolSelect = document.getElementById('toolSelect');
    const otherToolDiv = document.getElementById('otherToolDiv');
    const otherTool = document.getElementById('otherTool');
    const outputContent = document.getElementById('outputContent');
    const copyButton = document.getElementById('copyButton');

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size/2;
            const y = e.clientY - rect.top - size/2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Show/hide custom tool input with animation
    toolSelect.addEventListener('change', function() {
        if (this.value === 'other') {
            otherToolDiv.style.display = 'block';
            otherToolDiv.style.opacity = '0';
            setTimeout(() => {
                otherToolDiv.style.opacity = '1';
                otherTool.focus();
            }, 50);
        } else {
            otherToolDiv.style.opacity = '0';
            setTimeout(() => {
                otherToolDiv.style.display = 'none';
            }, 300);
        }
    });

    // Handle form submission with loading animation
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading animation
        outputContent.innerHTML = `
            <div class="text-center">
                <div class="loading"></div>
                <p class="mt-3">Generating amazing content...</p>
            </div>
        `;
        copyButton.style.display = 'none';

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        generateContent();
    });

    // Enhanced copy button functionality
    copyButton.addEventListener('click', async function() {
        const content = outputContent.querySelector('.generated-content').textContent;
        try {
            await navigator.clipboard.writeText(content);
            
            // Add success animation
            this.classList.add('copy-success');
            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
            
            setTimeout(() => {
                this.classList.remove('copy-success');
                this.textContent = 'Copy to Clipboard';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });

    // Add input animations
    document.querySelectorAll('.form-control, .form-select').forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.mb-3').classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            this.closest('.mb-3').classList.remove('input-focused');
        });
    });

    function generateContent() {
        const tool = toolSelect.value === 'other' ? otherTool.value : toolSelect.value;
        const contentType = document.getElementById('contentType').value;
        const affiliateLink = document.getElementById('affiliateLink').value;
        const niche = document.getElementById('niche').value;

        let content = '';
        const currentYear = new Date().getFullYear();

        switch(contentType) {
            case 'blog':
                content = generateBlogPost(tool, niche, currentYear, affiliateLink);
                break;
            case 'social':
                content = generateSocialPost(tool, affiliateLink);
                break;
            case 'email':
                content = generateEmailContent(tool, niche, affiliateLink);
                break;
            case 'comparison':
                content = generateComparisonContent(tool, currentYear);
                break;
            case 'tutorial':
                content = generateTutorial(tool);
                break;
            case 'review':
                content = generateProductReview(tool, niche, currentYear, affiliateLink);
                break;
            case 'case-study':
                content = generateCaseStudy(tool, niche, affiliateLink);
                break;
            case 'video-script':
                content = generateVideoScript(tool, affiliateLink);
                break;
            case 'instagram':
                content = generateInstagramContent(tool, affiliateLink);
                break;
            case 'pinterest':
                content = generatePinterestContent(tool, affiliateLink);
                break;
            case 'tiktok':
                content = generateTikTokScript(tool, affiliateLink);
                break;
            case 'youtube':
                content = generateYouTubeDescription(tool, affiliateLink);
                break;
            case 'landing':
                content = generateLandingPageCopy(tool, niche, affiliateLink);
                break;
            case 'faq':
                content = generateFAQContent(tool);
                break;
            case 'testimonial':
                content = generateTestimonialTemplate(tool, niche);
                break;
        }

        // Animate content appearance
        outputContent.style.opacity = '0';
        setTimeout(() => {
            outputContent.innerHTML = `<div class="generated-content">${content}</div>`;
            outputContent.style.opacity = '1';
            copyButton.style.display = 'block';
            
            // Highlight keywords
            highlightKeywords();
        }, 300);
    }

    function highlightKeywords() {
        const content = outputContent.querySelector('.generated-content');
        const keywords = ['ROI', 'transform', 'boost', 'premium', 'exclusive'];
        
        keywords.forEach(keyword => {
            const regex = new RegExp(`(${keyword})`, 'gi');
            content.innerHTML = content.innerHTML.replace(
                regex, 
                '<span class="highlight">$1</span>'
            );
        });
    }

    function generateBlogPost(tool, niche, year, affiliateLink) {
        const templates = [
            `The Ultimate ${tool} Review ${year}: Is It Worth It for ${niche} Bloggers?

Key Points:
• Why ${tool} is essential for ${niche} content creators
• Top features that will transform your blogging workflow
• Real results and ROI for ${niche} bloggers
• Exclusive discount: ${affiliateLink}`,

            `10 Ways ${tool} Can Skyrocket Your ${niche} Blog's Success in ${year}

1. Streamline Your Workflow
2. Enhance Content Quality
3. Save Valuable Time
4. Improve Engagement
5. Boost Productivity

Try it now: ${affiliateLink}`,

            `How I Used ${tool} to Grow My ${niche} Blog by 300%

• Before vs After Results
• Step-by-step implementation guide
• ROI breakdown
• Tips and tricks for maximum results

Start your journey: ${affiliateLink}`
        ];

        return templates[Math.floor(Math.random() * templates.length)];
    }

    function generateSocialPost(tool, affiliateLink) {
        const templates = [
            `🚀 Level up your content game with ${tool}!
            
💡 Transform your workflow
⚡️ Boost productivity
💪 Create better content

Try it now: ${affiliateLink}
#ContentCreator #Productivity`,

            `🎯 Want to know my secret weapon for amazing content?
            
It's ${tool}! This game-changing tool has transformed my workflow.

✨ Try it yourself: ${affiliateLink}
#BloggingTips #ContentCreation`,

            `💥 HUGE DEAL ALERT! 💥

Save big on ${tool} - the tool every creator needs!

🎁 Limited time offer
⚡️ Exclusive bonuses

Grab it now: ${affiliateLink}`
        ];

        return templates[Math.floor(Math.random() * templates.length)];
    }

    function generateEmailContent(tool, niche, affiliateLink) {
        const templates = [
            `Subject: Transform Your ${niche} Content with ${tool}

Hey there!

I wanted to share a game-changing tool that's revolutionizing how I create content for my ${niche} blog.

${tool} has helped me:
• Create content 2x faster
• Improve engagement
• Boost productivity

Check it out here: ${affiliateLink}

Best regards,
[Your Name]`,

            `Subject: Special ${tool} Offer for ${niche} Creators

Hi [Name],

Quick heads up about an amazing deal on ${tool} - a must-have for any serious ${niche} content creator.

Limited Time Offer:
✓ Exclusive discount
✓ Bonus features
✓ Premium support

Get started: ${affiliateLink}

Best,
[Your Name]`
        ];

        return templates[Math.floor(Math.random() * templates.length)];
    }

    function generateComparisonContent(tool, year) {
        const competitors = {
            'Grammarly': ['ProWritingAid', 'Hemingway Editor'],
            'Canva': ['Adobe Express', 'Stencil'],
            'Bluehost': ['HostGator', 'SiteGround']
        };

        const competitor = competitors[tool] ? 
            competitors[tool][Math.floor(Math.random() * competitors[tool].length)] : 
            '[Competitor]';

        return `${tool} vs ${competitor}: The Ultimate Comparison (${year})

1. Pricing Breakdown
   • ${tool} pricing structure
   • ${competitor} pricing structure
   • Best value analysis

2. Key Features
   • What ${tool} does better
   • What ${competitor} does better
   • Unique selling points

3. Ease of Use
4. Customer Support
5. Performance
6. Final Verdict

[Insert your ${tool} affiliate link here]`;
    }

    function generateTutorial(tool) {
        return `How to Get Started with ${tool}: A Complete Guide

Step 1: Setting Up Your Account
• Sign up process
• Initial configuration
• Best practices

Step 2: Essential Features
• Core functionality
• Advanced options
• Pro tips

Step 3: Optimization
• Performance tweaks
• Workflow integration
• Time-saving shortcuts

Step 4: Advanced Techniques
• Expert-level features
• Custom configurations
• Integration tips

[Insert your ${tool} affiliate link here]`;
    }

    function generateProductReview(tool, niche, year, affiliateLink) {
        const templates = [
            `${tool} Review ${year}: A ${niche} Blogger's Perspective

⭐⭐⭐⭐⭐ Overall Rating

Quick Summary:
• Perfect for: ${niche} content creators
• Standout features: [Key Features]
• Price: [Price Range]
• Best for: [Ideal User Type]

Detailed Review:
1. First Impressions
   • Intuitive interface
   • Quick setup process
   • Professional design

2. Key Features Deep-Dive
   • Feature 1: [Details]
   • Feature 2: [Details]
   • Feature 3: [Details]

3. Pros and Cons
   Pros:
   ✓ [Benefit 1]
   ✓ [Benefit 2]
   ✓ [Benefit 3]

   Cons:
   • [Minor drawback 1]
   • [Minor drawback 2]

4. Real Results
   • [Specific metric improvement]
   • [Time-saving statistics]
   • [ROI examples]

Special Offer: Get started with ${tool} today!
${affiliateLink}

Final Verdict: Highly Recommended for ${niche} Professionals`,

            `Is ${tool} Worth It? An Honest ${year} Review

Quick Take: ${tool} is a game-changer for ${niche} content creators.

What I Love:
• Intuitive Design
• Powerful Features
• Excellent Support
• Regular Updates

Real-World Impact:
→ [Specific use case]
→ [Results achieved]
→ [Time saved]

Investment & ROI:
• Cost breakdown
• Value analysis
• ROI calculation

Get Started: ${affiliateLink}

Bottom Line: Essential tool for serious ${niche} professionals.`
        ];

        return templates[Math.floor(Math.random() * templates.length)];
    }

    function generateCaseStudy(tool, niche, affiliateLink) {
        return `How [Client Name] Transformed Their ${niche} Business Using ${tool}

Challenge:
• [Specific problem]
• [Pain points]
• [Goals]

Solution:
→ Implemented ${tool} for [specific use case]
→ Customized setup for ${niche} needs
→ Integration with existing workflow

Results:
📈 [Metric 1] increased by X%
⏱️ [Metric 2] reduced by Y%
💰 [Metric 3] improved by Z%

Implementation Process:
1. Initial Setup
2. Team Training
3. Workflow Integration
4. Optimization

ROI Analysis:
• Cost savings: [Amount]
• Time saved: [Hours]
• Revenue increase: [Percentage]

Try ${tool} for your business:
${affiliateLink}`;
    }

    function generateVideoScript(tool, affiliateLink) {
        return `[Intro Animation]

Hey creators! Today we're diving into ${tool} - the game-changing tool you've been waiting for.

[Hook - 5 seconds]
Imagine cutting your workflow time in half while doubling your output...

[Problem - 15 seconds]
We all know the struggle...
• Pain point 1
• Pain point 2
• Pain point 3

[Solution - 30 seconds]
That's where ${tool} comes in...
• Key feature 1
• Key feature 2
• Key feature 3

[Demo - 45 seconds]
Let me show you how it works...
1. Step one
2. Step two
3. Step three

[Results - 20 seconds]
Since using ${tool}, I've...
• Result 1
• Result 2
• Result 3

[Call to Action]
Click the link below to try ${tool}:
${affiliateLink}

[Outro]
Don't forget to like and subscribe for more tips!`;
    }

    function generateInstagramContent(tool, affiliateLink) {
        const templates = [
            `✨ Game-Changing Tool Alert! ✨

🚀 Meet ${tool} - your new secret weapon for content creation!

Why I'm obsessed:
📱 Super user-friendly
⚡️ Lightning-fast results
💪 Professional-grade features

🔥 EXCLUSIVE OFFER 🔥
Click the link in bio to get started!
${affiliateLink}

#ContentCreator #BloggingTips #DigitalTools #CreatorEconomy #Productivity #WorkSmarter`,

            `🎯 Creator Pro Tip 🎯

Swipe to see how I use ${tool} to:
👉 [Benefit 1]
👉 [Benefit 2]
👉 [Benefit 3]

🎁 Special offer in bio!
${affiliateLink}

#CreatorTools #BloggerLife #DigitalMarketing #ContentCreation`
        ];

        return templates[Math.floor(Math.random() * templates.length)];
    }

    function generatePinterestContent(tool, affiliateLink) {
        return `How to Skyrocket Your Content Creation with ${tool} | Step-by-Step Guide for Bloggers | Essential Blogging Tools | Content Creation Tips | ${tool} Tutorial | Must-Have Blogging Resources

📌 Save this pin to transform your content creation process!

Learn how ${tool} can help you:
• Create better content faster
• Streamline your workflow
• Boost your productivity

Click through to get started: ${affiliateLink}

#BloggingTips #ContentCreation #BloggerResources #ProductivityTips #BloggingTools`;
    }

    function generateTikTokScript(tool, affiliateLink) {
        return `[🎥 Opening Shot]
*Text Overlay: "This tool changed my content game"*

[👤 Speaking to Camera]
"Let me show you how ${tool} transformed my workflow..."

[📱 Screen Recording]
*Demonstrate key feature*
"Watch how easy this is..."

[✨ Results Display]
"Before vs After using ${tool}"

[💡 Quick Tips]
"3 ways to use ${tool}:"
1. [Tip 1]
2. [Tip 2]
3. [Tip 3]

[🎯 Call to Action]
"Link in bio to try ${tool}!"
${affiliateLink}

#ContentCreator #BloggerTips #CreatorTools`;
    }

    function generateYouTubeDescription(tool, affiliateLink) {
        return `🚀 Transform Your Content Creation with ${tool}

In this video, I'm showing you how ${tool} can revolutionize your content creation process. Whether you're a beginner or experienced creator, these features will blow your mind!

⏱ TIMESTAMPS:
00:00 - Introduction
01:23 - What is ${tool}?
03:45 - Key Features
05:67 - Tutorial
08:90 - Results & Tips
10:00 - Special Offer

🔥 EXCLUSIVE OFFER:
Try ${tool} with my special discount: ${affiliateLink}

🎁 BONUS RESOURCES:
• Free Template: [Link]
• Cheat Sheet: [Link]
• Tutorial PDF: [Link]

#ContentCreation #BloggingTips #CreatorTools`;
    }

    function generateLandingPageCopy(tool, niche, affiliateLink) {
        return `Transform Your ${niche} Content Creation with ${tool}

🚀 Ready to revolutionize your content workflow?

✨ What ${tool} Offers:
• Feature 1: [Benefit]
• Feature 2: [Benefit]
• Feature 3: [Benefit]

💡 Perfect for:
• ${niche} Bloggers
• Content Creators
• Digital Marketers

⭐️ Success Stories:
"[Testimonial 1]"
"[Testimonial 2]"
"[Testimonial 3]"

🎁 Exclusive Offer:
• [Special Deal]
• [Bonus 1]
• [Bonus 2]

⚡️ Get Started Now:
${affiliateLink}

100% Satisfaction Guaranteed`;
    }

    function generateFAQContent(tool) {
        return `Frequently Asked Questions About ${tool}

Q: What is ${tool} and how does it work?
A: ${tool} is a powerful [type] tool that helps you [main benefit]. It works by [brief explanation].

Q: Who is ${tool} best suited for?
A: ${tool} is perfect for [user type 1], [user type 2], and [user type 3] who want to [goal].

Q: What are the key features of ${tool}?
A: The main features include:
• [Feature 1]: [Benefit]
• [Feature 2]: [Benefit]
• [Feature 3]: [Benefit]

Q: How much does ${tool} cost?
A: ${tool} offers flexible pricing plans starting at [price]. Each plan includes [features].

Q: Is there a free trial available?
A: Yes! You can try ${tool} free for [duration] to experience all features.

Q: How does ${tool} compare to alternatives?
A: ${tool} stands out by offering [unique benefits] and [special features].

Q: What kind of support is available?
A: ${tool} provides [support options] to ensure your success.`;
    }

    function generateTestimonialTemplate(tool, niche) {
        const templates = [
            `"As a ${niche} professional, I was skeptical about trying another tool. But ${tool} completely transformed my workflow. Within just [timeframe], I was able to [achievement]. The [specific feature] alone saved me [time/money] per month. It's now an essential part of my daily routine."

- [Name], ${niche} Blogger`,

            `"${tool} is a game-changer for ${niche} content creators. I've tried countless tools, but nothing comes close to the efficiency and results I get with ${tool}. My favorite feature is [feature], which helps me [benefit]. The ROI has been incredible - [specific result] in just [timeframe]."

- [Name], ${niche} Expert`,

            `Before ${tool}: [Problem]
After ${tool}: [Solution]

"I can't imagine running my ${niche} business without ${tool} now. It's helped me [specific achievement] and [another benefit]. The investment paid for itself within [timeframe]."

- [Name], ${niche} Professional`
        ];

        return templates[Math.floor(Math.random() * templates.length)];
    }
});
