module.exports = {
  //Método para dar formato a la fecha
  format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${  //Crear fecha y regresar valor
        new Date(date).getFullYear()}`;
    },

  //Método para validar último status posible de la orden
  compare_laststatus: (status_id) => {
    if (status_id < 6){ //Si el status es menor a 6
      return true; //Regresar true porque se puede seguir modificando el status de la orden
    } else { //Si el status es 6 o mayor
      return false; //Regresar false porque ya no se puede modificar el status de la orden
    }
  },

  //Método para validar si la orden puede ser modificada por su status actual
  compare_editstatus: (status_id) => {
    if (status_id < 4){ //Si el status es menor a 4
      return true; //Regresar true porque se puede seguir editando/eliminando la orden
    } else { //Si el status es 4 o mayor
      return false; //Regresar false porque ya no se puede seguir editando/eliminando la orden
    }
  }
};