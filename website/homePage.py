from flask import Flask, render_template, url_for, request, jsonify
import re
from bs4 import BeautifulSoup

website = Flask(__name__) #object initialized for flask

website.debug = True
website.jinja_env.cache = {}

@website.route("/",methods=['POST', 'GET'])
def home():
    # if request.method == 'POST':
    #     search_term = request.form.get("search")
    #     print(search_term)
    #     if search_term:
    #         highlighted_content = search(search_term)
    #         return render_template("homePage.html", content=highlighted_content)
    return render_template("homePage.html")

@website.route('/search', methods=['GET'])
def search():
    # Get the search term from the URL parameters (query string)
    query = request.args.get('query', '').strip().lower()
    print("entered search()", query)

    if not query:
        return jsonify({'resultsFound': False, 'highlightedContent': ""})

    # Load the HTML content directly (without opening the file as a string)
    # Get the current page based on the URL
    referrer_url = request.referrer
    print(f"Referrer URL: {referrer_url}")

    # Default page name (for example, homePage) if referrer is None or can't be determined
    current_page = "homePage"
    page_name = referrer_url.strip('/').split('/')[-2]
    print(f"Page Name: {page_name}")
    # Extract page name from the referrer URL (assuming the URL pattern is /<page_name>/...)
    if not page_name:
        current_page = "homePage"
        print(f"Current Page Name: {current_page}")
    else:
        url_parts = referrer_url.strip('/').split('/')
        print(f"URL parts: {url_parts}")
        page_name = url_parts[-1]
        current_page = page_name
        print(f"Current Page Name: {current_page}")

    print(f"Current PAGE from request ----> {current_page}")
    # Dynamically load the correct HTML file based on the current page
    html_file_path = f"D:/Cost_Optimization/website/templates/{current_page}.html"
    print(f"Current HTML file PATH the ----> {html_file_path}")

    # with open("D:/Cost_Optimization/website/templates/homePage.html", "r", encoding='utf-8') as file:
    #     html_content = file.read()
    try:
        with open(html_file_path, "r", encoding='utf-8') as file:
            html_content = file.read()
        print(f"Read the {current_page}.html file")

        # Remove all Jinja template tags to prevent them from showing as text
        html_content = re.sub(r"{%.*?%}", "", html_content)

        # Replace `{{ url_for(...) }}` with resolved URLs
        html_content = re.sub(
            r'{{\s*url_for\([\'"](.*?)[\'"],\s*filename=[\'"](.*?)[\'"]\)\s*}}',
            lambda m: url_for(m.group(1), filename=m.group(2)),
            html_content
        )

        # Perform case-insensitive search for the query within the HTML content
        matches = re.findall(re.escape(query), html_content, re.IGNORECASE)
        print("Found the matches")
        print(matches)

        # Regex to match specified tags and exclude <img> tags from the content
        def highlight_text_in_content_tags(match):
            # Get opening tag, content, and closing tag
            opening_tag, content, closing_tag = match.group(1), match.group(3), match.group(4)
            
            # Skip content if it contains any tag other than the ones specified
            ignore_tags = ["<script", "<style", "<img", "<span", "<ul", "<ol", "<li"]
            if any(tag in content.lower() for tag in ignore_tags):
                return match.group(0)  # Return the match unchanged if it contains unwanted tags
            
            # Apply highlighting only to non-<img> parts
            highlighted_content = re.sub(
            re.escape(query), 
            lambda m: f'<span class="highlight">{m.group(0)}</span>', 
            content, 
            flags=re.IGNORECASE
        )

            return f"{opening_tag}{highlighted_content}{closing_tag}"

        content_tags = ["p", "h1", "h2","h3","button", "a"]
        # If matches are found, return resultsFound as True, else False
        if matches:
            highlighted_content = re.sub(
            rf"(<({'|'.join(content_tags)})[^>]*>)(.*?)(</\2>)",  # Match specified tags and their content
                highlight_text_in_content_tags,
                html_content,
                flags=re.DOTALL
            )
        else:
            highlighted_content = html_content
        
        return jsonify({'highlightedContent': highlighted_content, 'resultsFound': bool(matches)})

    except FileNotFoundError:
        return jsonify({'resultsFound': False, 'error': 'HTML file not found'})


@website.route("/manufacturingIndustryOptimism" , methods=['POST','GET'])
def linear_production_optimization():
    return render_template("manufacturingIndustryOptimism.html")


@website.route('/production-scheduling', methods=['POST','GET'])
def production_scheduling():
    return render_template('production_scheduling.html')

@website.route('/inventory-management')
def inventory_management():
    return render_template('inventory_management.html')

@website.route('/workforce-allocation')
def workforce_allocation():
    return render_template('workforce_allocation.html')

@website.route('/supply-chain-optimization')
def supply_chain_optimization():
    return render_template('supply_chain_optimization.html')

@website.route('/waste-reduction')
def waste_reduction():
    return render_template('waste_reduction.html')

if __name__ == '__main__':
    website.run(debug=True) #run the website in debug mode (live reload while developing)