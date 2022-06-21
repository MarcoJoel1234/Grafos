//Clase Grafo
class Grafo {
    matriz;
    noVertices;
    vertices;
    aristas;
    dirigido;

    constructor() {
        this.noVertices;
        this.vertices = this.guardar_vertices();
        this.aristas = this.pedir_Aristas();
        this.matriz = this.crear_Matriz_Adyacencia();
        this.dirigido;
    }


    guardar_vertices() {
        let band;
        let vertices = [];
        do{
            //Guardar si el grafo es dirigido o no
            this.dirigido = parseInt(prompt("¿Tu grafo es dirigido o no dirigido?\n1.Dirigido\n2.No dirigido"));
            if(this.dirigido != 1 && this.dirigido != 2){
                alert("Ingrese una opcion valida");
                band = false
            }else{
                band = true;
            }
        }while(!band);
        //Guardar el numero de vertices
        do{
            this.noVertices = parseInt(prompt("Ingresa el numero de vertices que tendra tu grafo: "));
            if(isNaN(this.noVertices)){
                alert("Ingrese una opcion valida");
                band = false
            }else{
                band = true;
            }
        }while(!band);

        //Guardar vertices
        for (let i = 0; i < this.noVertices; i++) {
            vertices[i] = parseInt(prompt(`Ingresa el dato dentro del vertice No.${i + 1}`));
        }
        return vertices;
    }

    crear_Matriz_Adyacencia() {
        //Arreglo matriz
        let matriz = [];

        //Craer matriz vacia
        for (let i = 0; i < (this.noVertices); i++) {
            let aux = [];
            for (let j = 0; j < (this.noVertices); j++) {
                aux.push(0);
            }
            matriz.push(aux);
        }

        for (let i = 0; i < this.aristas.length; i++) {
            let v1 = this.aristas[i]["v1"];
            let v2 = this.aristas[i]["v2"];
            let ponderacion = this.aristas[i]["ponderacion"];

            //Si el grafo es Dirigido
            if (this.dirigido == 1) {
                matriz[v1][v2] = ponderacion;
            } else { //Si el grafo es No dirigido
                matriz[v1][v2] = ponderacion;
                matriz[v2][v1] = ponderacion;
            }
        }
        //Asignar valores a la matriz
        this.matriz = matriz;
        this.imprimir_Matriz();
        this.crear_Lista();
    }

    pedir_Aristas() {
        let aristas = [];
        let salir = false;
        let ponderacion = prompt("¿El grafo es ponderado? (S/N)");

        do {
            let v1 = prompt("Ingresa el primer grafo a conectar"); //Pedir el vertice 1
            let v2 = prompt("Ingresa el segundo grafo a conectar"); //Pedir el vertice 2
            var datoPon;

            if (ponderacion == "N") { //Si el grafo no es ponderado
                datoPon = 1; //La ponderación es 1
            } else { //Si el grafo es ponderado
                datoPon = prompt("Ingrese la ponderacion de la arista"); //Pedir la ponderación
            }

            aristas.push({ //Ingresar la nueva arista
                "v1": parseInt(v1) - 1,
                "v2": parseInt(v2) - 1,
                "ponderacion": datoPon
            });

            let op = prompt("¿Desea ingresar otra arista? (S/N)"); //Preguntar si se quiere otra arista

            if (op == "N") { //Si no se quiere otra arista
                salir = true; //Salir
            }
        } while (salir == false);

        return aristas;
    }

    imprimir_Matriz() {
        console.log("Matriz de adyacencia:");
        //Imprimir matriz
        let renglones = "    ";
        for (let i = 0; i < this.noVertices; i++) {
            renglones += `${this.vertices[i]}  `;
        }
        console.log(`${renglones}\n`);
        renglones = "";

        for (let i = 0; i < this.noVertices; i++) {
            renglones += `${this.vertices[i]}  `;
            for (let j = 0; j < this.noVertices; j++) {
                renglones += `|${this.matriz[i][j]}|`;
            }
            console.log(renglones);
            renglones = "";
        }
    }

    crear_Lista() {
        let lista;
        let band = false;
        console.log("\nLista de adyacencia");

        //Si es grafo dirigido
        if (this.dirigido == 1) {
            for (let i = 0; i < this.vertices.length; i++) {
                lista = `${this.vertices[i]}`
                band = false;
                //Comparar vertices de la matriz con el vertice actual
                for (let j = 0; j < this.aristas.length; j++) {
                    //Si el vertice actual es igual al vertice de la matriz
                    if ((this.aristas[j]["v1"] + 1) == this.vertices[i]) {
                        band = true;
                        lista += `--->|${this.aristas[j]["v2"] + 1}|`;

                        //Si la ponderación es 1
                        if (this.aristas[j]["ponderacion"] == 1) {
                            lista += `| |`;
                        } else { //Si no agregar la ponderacion
                            lista += `|${this.aristas[j]["ponderacion"]}|`;
                        }
                    }
                }
                //Si el vertice no tiene arista
                if (band == false) {
                    lista += `--->|Null|`;
                }
                console.log(lista);
            }
        } else { //Si es grafo no dirigido
            for (let i = 0; i < this.vertices.length; i++) {
                lista = `${this.vertices[i]}`
                band = false;
                //Comparar vertices de la matriz con el vertice actual
                for (let j = 0; j < this.aristas.length; j++) {

                    //Si el vertice actual es igual al vertice de la matriz
                    if ((this.aristas[j]["v1"] + 1) == this.vertices[i]) {
                        band = true;
                        lista += `--->|${this.aristas[j]["v2"] + 1}|`;

                        //Si la ponderación es 1
                        if (this.aristas[j]["ponderacion"] == 1) {
                            lista += `| |`;
                        } else { //Si no agregar la ponderacion
                            lista += `|${this.aristas[j]["ponderacion"]}|`;
                        }
                    }

                    //Si el vertice actual es igual al vertice de la matriz
                    if ((this.aristas[j]["v2"] + 1) == this.vertices[i]) {
                        band = true;
                        lista += `--->|${this.aristas[j]["v1"] + 1}|`;

                        //Si la ponderación es 1
                        if (this.aristas[j]["ponderacion"] == 1) {
                            lista += `| |`;
                        } else { //Si no agregar la ponderacion
                            lista += `|${this.aristas[j]["ponderacion"]}|`;
                        }
                    }
                }
                //Si el vertice no tiene arista
                if (band == false) {
                    lista += `--->|Null|`;
                }
                console.log(lista);
            }
        }
    }
}