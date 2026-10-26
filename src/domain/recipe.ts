export class Recipe {
  _name!: string;
  _category?: string;
  _description?: string;
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
    return `Receta: ${this.name} - categoría: ${this.category} - descripción: ${this.description}`;
  }
}
