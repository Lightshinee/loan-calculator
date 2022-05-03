//Listen to submit
document.getElementById('loan-form').addEventListener('submit', function(e){
// Hide result
document.getElementById('result').style.display = 'none'

//Show loader
document.getElementById('loading').style.display = 'block'

setTimeout(calculateResults, 1500)

e.preventDefault()
})

// Calculate results
function calculateResults(){
  console.log('calculating...')

  //UI vars
  const amount = document.getElementById('amount')
  const interest = document.getElementById('interest')
  const years = document.getElementById('years')
  const monthlyPayment = document.getElementById('monthly-payment')
  const totalPayment = document.getElementById('total-payment')
  const totalInterest = document.getElementById('total-interest')

  const principal = parseFloat(amount.value)
  const calculatedIterest = parseFloat(interest.value) / 100 / 12
  const calculatedPayment = parseFloat(years.value) * 12

  // compute monthly payment
  const x = Math.pow(1 + calculatedIterest, calculatedPayment)
  const monthly = (principal*x*calculatedIterest) / (x - 1)

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2)
    totalPayment.value = (monthly * calculatedPayment).toFixed(2)
    totalInterest.value = ((monthly * calculatedPayment)-principal).toFixed(2)

    //show result
    document.getElementById('result').style.display = 'block'

    //hide result
    document.getElementById('loading').style.display = 'none'

  } else {
    showError('Please check your numbers')
  }
}

//show error
function showError(error){
  //hide result
  document.getElementById('result').style.display = 'none'

  //hide result
  document.getElementById('loading').style.display = 'none'



  const errorDiv = document.createElement('div')
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading')

  errorDiv.className = 'alert alert-danger'

  errorDiv.appendChild(document.createTextNode(error))
  card.insertBefore(errorDiv, heading)

  //Clear error after 3 secs
  setTimeout(clearError, 2000)
}

function clearError(){
  document.querySelector('.alert').remove()
}