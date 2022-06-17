const {DataTypes} = require('sequelize');
//Exportamos una funcion que define el modelo
//Luego le inyectamos la conexion a sequelize.

module.exports = (sequelize) => {
    //definir el modelo
    sequelize.define('type', {
        name: {
           type: DataTypes.STRING,
           allowNull: false 
        }
    });
}