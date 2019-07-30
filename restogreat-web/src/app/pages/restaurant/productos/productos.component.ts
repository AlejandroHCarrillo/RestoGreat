import { UsuarioService } from './../../../services/usuario/usuario.service';
import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { ProductoService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Producto } from "src/app/models/producto.model";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _productoService: ProductoService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarProductos();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarProductos();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("productos", id);
  }

  cargarProductos() {
    this.cargando = true;
    this._productoService
      .cargarProductos(this.desde)
      .subscribe((resp: any) => {
        //  console.log(resp);
        this.totalRegistros = resp.total;
        this.productos = resp.productos;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarProductos();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarProductos();
    }
  }

  buscarProducto(termino: string) {
    if (termino.length <= 0) {
      this.cargarProductos();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._productoService
      .buscarProductos(termino)
      .subscribe((productos: Producto[]) => {
        // console.log(productos);
        this.totalRegistros = productos.length;
        this.productos = productos;
      });
    this.cargando = false;
  }

  borrarProducto(id: string) {
    // console.log(id);
    Swal.fire({
      title: "¿Estas seguro de eliminar a este producto?",
      text: "Una vez eliminado no es posible recuperar al producto",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    })!.then(borrar => {
      // console.log(borrar);
      if (borrar) {
        this._productoService.borrarProducto(id).subscribe(resp => {
          // console.log(resp);
          this.cargarProductos();
        });
      } else {
        Swal.fire( "El producto no fue eliminado", "El producto no ha sido eliminado" );
        // alert("El producto no fue eliminado");
      }
    });
  }

  crearProducto(nombre: string) {
    Swal.fire({
      title: 'Alta de nuevo producto',
      text: 'Por favor escriba el nombre del producto:',
      input: 'text',
      // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor escriba el nombre del producto'
        }
      }
    }).then(value => {
      let producto = new Producto();

      producto.clave = value.value;  
      producto.fechaActualizacion = new Date();
      producto.usuario._id =  this._usuarioService.usuario._id;

      this._productoService.crearProducto(producto)
                        .subscribe(resp => {
                          console.log(resp);
                          this.cargarProductos();
                          Swal.fire('Se ha creado al producto:', resp.nombre, 'success' );
                      });
    });
  }

  guardarProducto(producto: Producto) {
    producto.usuario._id =  this._usuarioService.usuario._id;
    this._productoService.actualizarProducto(producto).subscribe(resp => {
      console.log(resp);
    });
  }
}
