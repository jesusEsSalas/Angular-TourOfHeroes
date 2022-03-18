import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes.sort((a,b) => {
      return b.puntos - a.puntos;
    }));
  }

  add(name: string, puntos: string): void {
    name = name.trim();
    if (!name) { return; }
    if (!puntos) { return; }
    this.heroService.addHero({ name } as Hero )
      .subscribe(hero => {
        hero.puntos = Number(puntos);
        this.heroes.push(hero);
        this.heroes.sort((a,b) => {
          return b.puntos - a.puntos;
        });
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

}