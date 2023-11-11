import { Component } from '@angular/core';
import { Produit } from '../model/Produit';
import { ProduitService } from '../services/produit.service';
import { Categorie } from '../model/Categorie';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html'
})
export class AddProduitComponent {
  categories! : Categorie[] ;
  newProduit = new Produit();
  newIdCat!: number;
  newCat!: Categorie;
  Message: String | undefined ;
  constructor(private produitService : ProduitService,private router: Router){}
  ngOnInit(): void {
    this.produitService.listeCategories().
    subscribe(cats => {this.categories = cats._embedded.categories;
    console.log(cats);
    });
    }
  aaddProduit(){
   //this.produitService.ajouterProduit(this.newProduit);
   this.newCat = this.produitService.consulterCategorie(this.newIdCat) ;
   this.newProduit.categorie = this.newCat ;
   this.produitService.ajouterProduit(this.newProduit)
   this.router.navigate(["produits"]);

    }

    
    addProduit(){
      this.newProduit.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;
      this.produitService.ajouterProduit(this.newProduit)
      .subscribe(prod => {
      console.log(prod);
      this.router.navigate(['produits']);
      });
      }
    }
      
