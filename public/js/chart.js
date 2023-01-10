const canvasForChart = document.getElementById("Chart"); //Get canvas element where the chart is placed

//Function to get chart data and create the chart
async function createChart () {
  const response  = await fetch( '/chartdata', { //Fetch /chardata to get order data for the user
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
  });

  if(response.ok){ //If response was ok
    let data = await response.json(); //Wait for the response to be converted to json
    let labelsData = [];
    let dataSet = [];
    for (let i = 0; i < data.length; i++){ //Loop over the data obtained from database
      labelsData.push(data[i].orderstatus.name); //Get each status of the orders and build labels array
      dataSet.push(data[i].total); //Get total of orders with each status and build data array with totals
    }
    new Chart (canvasForChart, { //Create new chart
      type: 'doughnut', //Doughnut type
      data: {   //Pass labels and data
          labels: labelsData,
          datasets: [{
            label: 'Quantity',
            data: dataSet,
            borderWidth: 1
          }]
        },
        options: { //Define options for the chart
          responsive: true,
          maintainAspectRatio: false,
        }
      }); 
  }else{ //If response was not ok
    alert('Error when getting data for chart'); //Send alert
  }

}

createChart(); //Call function to create chart




