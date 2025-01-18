from flask import Flask, jsonify, render_template, request

app = Flask(__name__)
applications = [];



@app.route('/api/allApplications', methods=['GET'])
def get_all_applications_v2():
    return jsonify(applications)


# API to add an application to the database
@app.route('/api/add_appNumber', methods=['POST'])
def add_application():
    print("adding application")
    data = request.get_json()
    appNumber = data.get('appNumber')
    appStatus = data.get('appStatus')
    
    applications.append({
        'appNumber': appNumber,
        'appStatus': appStatus
    })

    return jsonify({'message': 'Application added successfully'})

@app.route('/api/check_appStatus/<appNumber>', methods=['GET'])
def check_status(appNumber):
    appNumber = appNumber.strip()
    for app in applications:
        if app['appNumber'] == appNumber:
            return jsonify({'status': app['appStatus']})
    
    return jsonify({'status': 'Not Found'})

@app.route('/api/change_appStatus/<appNumber>', methods=['POST'])
def change_status(appNumber):
    data = request.get_json()
    new_status = data.get('appStatus')

    for app in applications:
        if app['appNumber'] == appNumber:
            app['appStatus'] = new_status;
            return jsonify({'message': 'Application status updated'})
    
    return jsonify({'message': 'Application not found'})
 
# Route to render the index.html page
@app.route('/')
def index():
    return render_template('index.html')
    
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")