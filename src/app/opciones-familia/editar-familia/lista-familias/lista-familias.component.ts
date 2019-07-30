import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FamilyService } from 'src/app/family.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-lista-familias',
  templateUrl: './lista-familias.component.html',
  styleUrls: ['./lista-familias.component.css']
})
export class ListaFamiliasComponent implements OnInit, OnDestroy {

  loading = false;
  index;
  listaFamilias = [];
  listaFamiliasCopy = [];
  familiasChanged = new Subject<any[]>();

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  constructor(private familiaService: FamilyService) { }

  ngOnInit() {

    this.familiasChanged.subscribe(
      (aspirantes) => {
        this.listaFamilias = aspirantes;
      }
    );

    this.familiaService.getFamilyArray()
    .subscribe((familias) => {
      this.listaFamilias = familias;
      this.listaFamiliasCopy = this.listaFamilias.slice();
      this.loading = true;
    }, (error) =>
    console.log(error));
  }

  onGetIndex(i: number) {
    this.index = i;
  }

  getResultSearchArray() {
    this.listaFamilias.splice(0, this.listaFamilias.length);
    for (const familia of this.listaFamiliasCopy) {
      if (familia.NOMB_FAMILIA.toLowerCase().includes(this.searchInput.nativeElement.value.toLowerCase())) {
        this.listaFamilias.push(familia);
      }
    }
    this.familiasChanged.next(this.listaFamilias.slice());
  }

  changeClassID(id) {
    const element = document.getElementById(id);
    element.classList.add('active');
    this.listaFamilias.forEach(familia => {
      if (familia.id !== id) {
        const tag = document.getElementById(familia.id);
        tag.classList.remove('active');
      }
    });
  }

  ngOnDestroy() {
    this.familiasChanged.unsubscribe();
  }
}
