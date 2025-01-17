from flask import Flask, jsonify, render_template, request

app = Flask(__name__)
applications = ["app1"];



@app.route('/api/books', methods=['GET'])
def get_all_books_v2():
    return jsonify({'list of applications':applications})


# API to add a book to the database
@app.route('/api/add_appNumber', methods=['POST'])
def add_application():
    print("adding application")
    data = request.get_json()
    title = data.get('appNumber')
    applications.append(title);
    return jsonify({'message': 'Application added successfully'})
 
# Route to render the index.html page
@app.route('/')
def index():
    return render_template('index.html')
    
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")