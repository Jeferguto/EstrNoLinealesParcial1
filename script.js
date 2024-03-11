// Creación de conjuntos de datos vacíos para nodos y aristas utilizando la biblioteca vis.js
var nodes = new vis.DataSet([]);
var edges = new vis.DataSet([]);

// Variables auxiliares utilizadas en el código
let list = [];
let veri = [];

// Obtención del contenedor del gráfico de red desde el HTML
var container = document.getElementById("mynetwork");

// Definición de los datos del gráfico (nodos y aristas)
var data = {
  nodes: nodes,
  edges: edges,
};

// Opciones de visualización del gráfico
var options = {
  edges: {
    smooth: {
      enabled: true,
      type: "continuous",
    },
    font: {
      size: 14,
      align: "middle",
    },
  },
};

// Creación del gráfico de red utilizando los datos y opciones especificados
var network = new vis.Network(container, data, options);

// Configuración del evento de clic para añadir un nodo
var añadirNodoButton = document.getElementById("añadirNodo");
añadirNodoButton.addEventListener("click", function () {
  var label = prompt("Añadir nodo:");
  if (label != null) {
    var id = label.replace(/\s/g, "");

    // Verificar si el nodo ya existe
    var existingNode = nodes.get(id);
    if (existingNode) {
      alert("El nodo ya existe.");
    } else {
      // Agregar el nodo solo si no existe
      nodes.add({ id: id, label: label, color: "#5AB885" });
    }
  }
});

// Configuración del evento de clic para añadir una arista (enlace entre nodos)
var añadirEnlaceButton = document.getElementById("añadirEnlace");
añadirEnlaceButton.addEventListener("click", function () {
  var from = prompt("De:");
  var to = prompt("A:");
  var label = prompt("Costo de tarea:");
  if (from != null && to != null) {
    var id = from + "-" + to;
    edges.add({ id: id, from: from, to: to, label: label, color: "#7F8C8D" });
  }
});

// Configuración del evento de clic para borrar nodos o aristas seleccionados
var deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", function () {
  var selectedNodes = network.getSelectedNodes();
  var selectedEdges = network.getSelectedEdges();
  nodes.remove(selectedNodes);
  edges.remove(selectedEdges);
});

var modificarNodoButton = document.getElementById("modificarNodo");
modificarNodoButton.addEventListener("click", function () {
  var nodoId = prompt("Modificar nodo:");
  var nuevoTexto = prompt("Nuevo dato:");
  if (nodoId !== null && nuevoTexto !== null) {
    var node = nodes.get(nodoId);
    if (node) {
      nodes.update({ id: nodoId, label: nuevoTexto });
    } else {
      alert("El nodo especificado no existe.");
    }
  }
});
