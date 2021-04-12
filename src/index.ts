console.log("TS funcionando");


let juego: [[number,number,number],[number,number,number],[number,number,number]];
var jugadorActivo = 0;
var ganador = 0;
let jugador1: any;
let jugador2: any;
declare var $: any;

// Metodo para limpieza de cajas
function limpiarCajas(){
	var cajas = document.getElementsByClassName("caja");
	 Array.from(cajas).forEach(function(div){
		div.innerHTML= "";
		div.className = "caja";
	});
}

function reiniciar(){
	ganador = 0;
	(<HTMLInputElement>document.getElementById("inicio")).disabled = false;
	(<HTMLInputElement>document.getElementById("reiniciar")).disabled = true;
	juego = [[0 , 0 , 0] ,[ 0 , 0 , 0] ,[0 , 0 , 0] ];	
	jugadorActivo = 1;
	(<HTMLInputElement>document.getElementById("info")).innerHTML = "Ahora puede iniciar una nueva partida!";
	limpiarCajas();

}

let posFil1, posCol1, posFil2, posCol2, posFil3, posCol3 : any;

function validarCaso(posFil1, posCol1, posFil2, posCol2, posFil3, posCol3 ){
	if (juego[posFil1 -1][posCol1 -1] == juego[posFil2 -1][posCol2 -1] && juego[posFil1 -1][posCol1 -1] == juego[posFil3 -1][posCol3 -1] && juego[posFil3 -1][posCol3 -1] != 0  ) {
		ganador = 1;
		(<HTMLInputElement>document.getElementById("caja" + posFil1.toString() + posCol1.toString())).className = "caja  cajaGanador";
		(<HTMLInputElement>document.getElementById("caja" + posFil2.toString() + posCol2.toString())).className = "caja  cajaGanador";
		(<HTMLInputElement>document.getElementById("caja" + posFil3.toString() + posCol3.toString())).className = "caja  cajaGanador";
		

	} 
}

function iniciar(){
    jugador1 = (<HTMLInputElement>document.getElementById("J1")).value;
    jugador2 = (<HTMLInputElement>document.getElementById("J2")).value;
    
	(<HTMLInputElement>document.getElementById("inicio")).disabled = true;
	(<HTMLInputElement>document.getElementById("reiniciar")).disabled = false;
	juego = [[0 , 0 , 0] ,[ 0 , 0 , 0] ,[0 , 0 , 0] ];
	jugadorActivo = 1;
	(<HTMLInputElement>document.getElementById("info")).innerHTML = "Iniciamos, Ahora es el turno del" + jugador1;
}

function validarGanador(){

validarCaso(1,1, 1,2, 1,3 );
validarCaso(2,1, 2,2, 2,3 );
validarCaso(3,1, 3,2, 3,3 );
// Horizontales	
validarCaso(1,1, 2,2, 3,3 );
validarCaso(1,3, 2,2, 3,1 );
// Diagonales
validarCaso(1,1, 2,1, 3,1 );
validarCaso(1,2, 2,2, 3,2 );
validarCaso(1,3, 2,3, 3,3 );
// Verticales
	if (ganador == 1) {
        if(jugadorActivo == 1){
            (<HTMLInputElement>document.getElementById("resultado")).innerHTML =  "Ha ganado el jugador " + jugador1;
            $('#Ganador').modal('show');
        }else if(jugadorActivo == 2){
            (<HTMLInputElement>document.getElementById("resultado")).innerHTML =  "Ha ganado el jugador " + jugador2;
            $('#Ganador').modal('show');
        }
		
		reiniciar();
	}
}

function jugada(caja){

	// Validar jugador en turno, Validar el objeto (X . O), Validar posible ganador, Validar que este libre la caja
    jugador1 = (<HTMLInputElement>document.getElementById("J1")).value;
    jugador2 = (<HTMLInputElement>document.getElementById("J2")).value;
	if (juego[parseInt(caja.charAt(0)) - 1][parseInt(caja.charAt(1))  - 1] != 0) {
		//alert("Esta caja ya ha sido jugada!");
        $('#cajaYaJugada').modal('show')
	} else {
    // Esto lo podemos optimizar!
		if (jugadorActivo == 1) {
		// En caso del jugador numero 1
		juego[parseInt(caja.charAt(0)) - 1][parseInt(caja.charAt(1))  - 1] = 1;
		(<HTMLInputElement>document.getElementById("caja" + caja)).innerHTML = "X";
		(<HTMLInputElement>document.getElementById("caja" + caja)).className = "caja jugador1";
		// Aqui definir un posible ganador!
		validarGanador();
		(<HTMLInputElement>document.getElementById("info")).innerHTML = "Ahora es el turno del " + jugador2;
		jugadorActivo = 2;
		} else if(jugadorActivo == 2) {
			// En caso del jugador numero 2
			juego[parseInt(caja.charAt(0)) - 1][parseInt(caja.charAt(1))  - 1] = 2;
			(<HTMLInputElement>document.getElementById("caja" + caja)).innerHTML = "O";
			(<HTMLInputElement>document.getElementById("caja" + caja)).className = "caja jugador2";
			validarGanador();
			(<HTMLInputElement>document.getElementById("info")).innerHTML = "Ahora es el turno del "+ jugador1;
			jugadorActivo = 1;
		}else{
			//En caso que no se ha iniciado el juego
			alert("El juego no se ha iniciado!");
		}
	}

	

}