interface RecipeCardProps {
  image: string;
  title: string;
  description: string;
  category: string;
}

const RecipeCard = ({ image, title, description, category }: RecipeCardProps) => {
  return (
    <article className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </div>
      <div className="p-5 space-y-3">
        <span className="text-xs font-medium uppercase tracking-widest text-accent">
          {category}
        </span>
        <h3 className="font-heading text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
        <button className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors duration-300 pt-1">
          Read More
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default RecipeCard;
