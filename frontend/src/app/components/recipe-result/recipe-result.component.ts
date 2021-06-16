import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Recipe} from "../../services/recipe.service";

@Component({
  selector: 'app-recipe-result',
  templateUrl: './recipe-result.component.html',
  styleUrls: ['./recipe-result.component.css']
})
export class RecipeResultComponent implements OnInit {

  constructor(public router: Router,
              ) { }

  @Input() result: [number, Recipe] = [0, {} as Recipe]

  public isHovered = false

  ngOnInit(): void {
  }

}
