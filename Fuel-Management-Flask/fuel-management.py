from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the model
try:
    model = joblib.load('/Users/usmanali/Uwindsor/Third/Project/trackline-solutions-web/Fuel-Management-Flask/ML-Model/fuel_mileage_model.pkl')
except Exception as e:
    print(f"Error loading model: {e}")

# Define the car and product dictionaries
car_dict = {
    'CADDY': 0, 'DAF': 1, 'FORD': 2, 'IVECO': 3, 'LANDROVER': 4, 
    'MERCEDES': 5, 'MITSUBISHI': 6, 'NISSAN': 7, 'PEUGEOT': 8, 
    'RENAULT': 9, 'VAUXHALL': 10, 'VOLKSWAGEN': 11, 'VOLVO': 12
}

product_dict = {
    'CNG': 0, 'DIESEL': 1, 'GASOIL': 2
}

@app.route('/')
def input_page():
    return render_template('User_input.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        distance = float(request.form['distance'])
        fuel_used = float(request.form['fuel_used'])
        product = request.form['product'].upper()
        car = request.form['car'].upper()

        # Map Car and Product to integers
        car = car_dict.get(car, None)
        product = product_dict.get(product, None)

        if car is None or product is None:
            return jsonify({'error': "Car or Product value doesn't exist in the dictionary."}), 400

        # Calculate actual mileage
        actual_mileage = distance / fuel_used

        # Make prediction
        predicted_mileage = model.predict(np.array([distance, product, car]).reshape(1, 3))[0].round(3)
        lower_bound = (predicted_mileage - 5).round(2)
        upper_bound = (predicted_mileage + 5).round(2)
        # Determine fuel theft
        if actual_mileage < lower_bound:
            theft_status = "Yes, fuel theft detected"
        else:
            theft_status = "No Fuel Theft"

        response = {
            'actual_mileage': actual_mileage,
            'predicted_mileage_lower_bound': lower_bound,
            'predicted_mileage_upper_bound': upper_bound,
            'theft_status': theft_status
        }
        return render_template('Prediction.html', result=response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
