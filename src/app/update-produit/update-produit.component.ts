import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../model/Produit';
import { Categorie } from '../model/Categorie';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
})
export class UpdateProduitComponent {
  currentProduit = new Produit();
  categories!: Categorie[];
  updatedCatId!: number;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService) {

  }
  ngOnInit(): void {
    this.produitService.listeCategories().
    subscribe(cats => {this.categories = cats._embedded.categories;
    console.log(cats);
    });
    this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id']).
    subscribe( prod =>{ this.currentProduit = prod; 
    this.updatedCatId = 
    this.currentProduit.categorie.idCat;
    } ) ;
    }


  updateProduit() {
    this.currentProduit.categorie = this.categories.
     find(cat => cat.idCat == this.updatedCatId)!;
    this.produitService.updateProduit(this.currentProduit).subscribe(prod => {
    this.router.navigate(['produits']); }
    );
    }
    

}
