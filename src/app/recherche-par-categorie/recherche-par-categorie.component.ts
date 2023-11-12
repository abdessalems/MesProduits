import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/Produit';
import { Categorie } from '../model/Categorie';
import { ProduitService } from '../services/produit.service';


@Component({
  selector: 'app-recherche-par-categorie',
  templateUrl: './recherche-par-categorie.component.html',
  styleUrls: ['./style.css'] // Include your CSS file in the styleUrls array
})

export class RechercheParCategorieComponent implements OnInit {


  produits!: Produit[];
  IdCategorie!: number;
  categories!: Categorie[];
  constructor(private produitService: ProduitService) {

  }
  ngOnInit(): void {
    this.produitService.listeCategories()
      .subscribe(cats => {
        this.categories = cats._embedded.categories;
        console.log(cats);
      });
  }

  onChange() {
    console.log('Selected category:', this.IdCategorie);
    this.produitService.rechercherParCategorie(this.IdCategorie)
      .subscribe(prods => {
        console.log('Products:', prods);
        this.produits = prods;
      });
  }
  

}



