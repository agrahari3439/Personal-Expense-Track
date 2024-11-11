from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

expenses = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_expense', methods=['POST'])
def add_expense():
    data = request.json
    category = data.get('category')
    amount = data.get('amount')
    date = data.get('date')

    if category and amount and date:
        expense = {
            'category': category,
            'amount': amount,
            'date': date
        }
        expenses.append(expense)
        return jsonify({'expenses': expenses}), 200
    return jsonify({'error': 'Invalid input'}), 400

@app.route('/get_expenses', methods=['GET'])
def get_expenses():
    return jsonify({'expenses': expenses}), 200

if __name__ == '__main__':
    app.run(debug=True)
