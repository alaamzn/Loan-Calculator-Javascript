// Listen for submit 
document.getElementById('loan-form').addEventListener('submit', function(e){
   // hide results
   document.getElementById('results').style.display = 'none';

   //Show Loader
   document.getElementById('loading').style.display = 'block';
   
   setTimeout(calculateResults, 1000);
   
   
   e.preventDefault();
});

// Calculate Results
function calculateResults(e){
   console.log('Calculating...');
   // UI Vars 
   const amount = document.getElementById('amount');
   const interest = document.getElementById('interest');
   const years = document.getElementById('years');
   
   const monthlyPayment = document.getElementById('monthly-payment');
   const totalPayment = document.getElementById('total-payment');
   const totalInterest = document.getElementById('total-interest');

   const principal = parseFloat(amount.value);
   const calculateInterest = parseFloat(interest.value)/ 100/ 12;
   const calculatedPayments = parseFloat(years.value) * 12;


   // Compute monthly payment
   const x = Math.pow(1 + calculateInterest, calculatedPayments);
   const monthly = (principal*x*calculateInterest)/(x-1);

   if (isFinite(monthly)){
      monthlyPayment.value = monthly.toFixed(2);
      totalPayment.value = (monthly * calculatedPayments).toFixed(2);
      totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
      document.getElementById('loading').style.display = 'none';
      document.getElementById('results').style.display = 'block';
   }else {
      showError('Please check your numbers');
   }
   e.preventDefault();
}



// Show Error
function showError(error){
   
   // Hide Loader
   document.getElementById('loading').style.display = 'none';
   // Hide Results
   document.getElementById('results').style.display = 'none';
   
   // Create a div
   const errorDiv = document.createElement('div');
   

   // Get elements 
   const card = document.querySelector('.card');
   const heading = document.querySelector('.heading');

   
   // Add class
   errorDiv.className = 'alert alert-danger';

   // Create text node and append ro div
   errorDiv.appendChild(document.createTextNode(error));
   
   
   // Insert error aboce heading
   card.insertBefore(errorDiv, heading);

   // Clear error after 3 seconds
   setTimeout(clearError, 3000); 
}


// Clear error 
function clearError(){
   document.querySelector('.alert').remove();
};