import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../model/Produit';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: []
})
export class RechercheParNomComponent implements OnInit {

  produits: Produit[] = [];
  nomProduit!: string;
  constructor(private produitService: ProduitService ) {}


  ngOnInit(): void {
    
  }

  rechercherProds(){
    this.produitService.rechercherParNom(this.nomProduit).
    subscribe(prods => {
    this.produits = prods; 
    console.log(prods)});
    }

}
