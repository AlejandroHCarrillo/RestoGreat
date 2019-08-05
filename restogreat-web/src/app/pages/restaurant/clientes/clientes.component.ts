import { UsuarioService } from './../../../services/usuario/usuario.service';
import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { ClienteService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Cliente } from "src/app/models/cliente.model";
import Swal from 'sweetalert2'

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: []
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _clienteService: ClienteService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarClientes();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarClientes();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("clientes", id);
  }

  cargarClientes() {
    this.cargando = true;
    this._clienteService
      .cargarClientes(this.desde)
      .subscribe((resp: any) => {
        console.log(resp);
        this.totalRegistros = resp.total;
        this.clientes = resp.clientes;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarClientes();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarClientes();
    }
  }

  buscarCliente(termino: string) {
    if (termino.length <= 0) {
      this.cargarClientes();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._clienteService
      .buscarClientes(termino)
      .subscribe((clientes: Cliente[]) => {
        // console.log(clientes);
        this.totalRegistros = clientes.length;
        this.clientes = clientes;
      });
    this.cargando = false;
  }

  borrarCliente(id: string) {
    // console.log(id);
    // confirm()

    Swal.fire({
      title: "¿Estas seguro de eliminar a este cliente?",
      text: "Una vez eliminado no es posible recuperar al cliente",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    })
    .then((willDelete) => {
      // console.log(willDelete);      
      if (willDelete.value) {
        // console.log('Ya lo borro');        
        this._clienteService.borrarCliente(id).subscribe(resp => {
          this.cargarClientes();
        });
      } else {
        // console.log('NO BORRADO');
        Swal.fire( "El cliente no fue eliminado", "El cliente no ha sido eliminado" );
      }
    });

  }

    crearCliente(nombre: string) {
      Swal.fire({
        title: 'Alta de nueva forma de pago',
        text: 'Por favor escriba el nombre del cliente:',
        input: 'text',
        // inputValue: inputValue,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Por favor escriba el nombre del cliente'
          }
        }
      }).then(value => {
        let cliente = new Cliente();

        cliente.nombre = value.value;  
        cliente.fechaActualizacion = new Date();
        cliente.usuario =  this._usuarioService.usuario._id;
  
        this._clienteService.crearCliente(cliente)
                          .subscribe(resp => {
                            console.log(resp);
                            this.cargarClientes();
                            Swal.fire('Se ha creado al cliente:', resp.nombre, 'success' );
                        });
      });
    }

  guardarCliente(cliente: Cliente) {
    this._clienteService.actualizarCliente(cliente).subscribe(resp => {
      console.log(resp);
    });
  }
}
