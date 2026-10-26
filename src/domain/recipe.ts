export class Recipe {
  _name!: string;
  _category?: string;
  _description?: string;
  _prepTime!: number;
  _isFavorite: boolean = false;

  constructor(aName: string) {
    this.name = aName;
  }

  get name(): string {
    return this._name;
  }

  set name(aName: string) {
    const trimmed = aName.trim();
    if (trimmed.length === 0) {
      throw new Error("El nombre de la receta no puede ser vacío.");
    }
    this._name = trimmed;
  }

  get category(): string | undefined {
    return this._category;
  }

  set category(aCategory: string) {
    this._category = aCategory;
  }

  get description(): string | undefined {
    return this._description;
  }

  set description(aDescription: string) {
    this._description = aDescription;
  }

  get prepTime(): number {
    return this._prepTime;
  }

  set prepTime(aPrepTime: number) {
    if (aPrepTime === undefined || aPrepTime === null || isNaN(aPrepTime) || aPrepTime < 0) {
      throw new Error("El tiempo de preparación es obligatorio y debe ser mayor o igual a 0.");
    }
    this._prepTime = aPrepTime;
  }

  get isFavorite(): boolean {
    return this._isFavorite;
  }

  set isFavorite(value: boolean) {
    this._isFavorite = value;
  }

  toggleFavorite(): void {
    this._isFavorite = !this._isFavorite;
  }

  toString(): string {
    return `Receta: ${this.name} - categoría: ${this.category} - descripción: ${this.description} - tiempo de preparación: ${this.prepTime} minutos`;
  }
}
