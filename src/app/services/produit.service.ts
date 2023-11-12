import { Injectable } from '@angular/core';
import { Produit } from '../model/Produit';
import { Categorie } from '../model/Categorie';
import { Observable } from 'rxjs';
import { apiURL } from '../config';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategorieWrapper } from '../model/CategorieWrapper';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  apiURL: string = 'http://localhost:8080/produits/api';
  apiURLCat: string = 'http://localhost:8080/produits/cat';


  produits!: Produit[]; //un tableau de produits
  categories!: Categorie[];



  constructor(private http: HttpClient) {

    /*

    this.categories = [{ idCat: 1, nomCat: "PC" },
    { idCat: 2, nomCat: "Imprimante" }];
    this.produits = [
      {
        idProduit: 1, nomProduit: "PC Asus", prixProduit: 3000.600,
        dateCreation: new Date("01/14/2011"), categorie: { idCat: 1, nomCat: "PC" }
      },
      {
        idProduit: 2, nomProduit: "Imprimante Epson", prixProduit: 450,
        dateCreation: new Date("12/17/2010"), categorie: { idCat: 2, nomCat: "Imprimante" }
      },
      {
        idProduit: 3, nomProduit: "Tablette Samsung", prixProduit: 900.123,
        dateCreation: new Date("02/20/2020"), categorie: { idCat: 1, nomCat: "PC" }
      }
    ];
    */


  }


  consulterCategorie(id: number): Categorie {
    return this.categories.find(cat => cat.idCat == id)!;


  }

  rechercherParCategorie(idCat: number):Observable< Produit[]> {
    const url = `${this.apiURL}/prodscat/${idCat}`;
    return this.http.get<Produit[]>(url);
    }
  ajouterProduit(prod: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiURL, prod, httpOptions);
  }
  rechercherParNom(nom: string):Observable< Produit[]> {
    const url = `${this.apiURL}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
    }

  listeProduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiURL);

  }
  listeCategories(): Observable<CategorieWrapper> {
    return this.http.get<CategorieWrapper>(this.apiURLCat);
  }


  



  supprimerProduit(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterProduit(id: number): Observable<Produit> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Produit>(url);
  }

  trierProduits() {
    this.produits = this.produits.sort((n1, n2) => {
      if (n1.idProduit! > n2.idProduit!) {
        return 1;
      }
      if (n1.idProduit! < n2.idProduit!) {
        return -1;
      }
      return 0;
    });
  }

  updateProduit(prod: Produit): Observable<Produit> {
    return this.http.put<Produit>(this.apiURL, prod, httpOptions);
  }

}