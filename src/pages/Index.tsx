import { Link } from "react-router-dom";
import { Search, ChevronRight, Clock, TrendingUp, Utensils, Mail, Instagram, Youtube, Facebook, Flame, Drumstick, Soup, CakeSlice, Beef, Salad, Egg, Cookie, Sandwich, ChefHat, Heart } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";

import chimichurri from "@/assets/chimichurri-sauce.jpg";
import hotHoney from "@/assets/hot-honey-recipes.avif";
import lasagnaSoup from "@/assets/lasagna-soup.jpg";
import marryMeChicken from "@/assets/marry-me-chicken.avif";
import roastedChicken from "@/assets/roasted-chicken.jpg";
import sweetPotatoBowls from "@/assets/sweet-potato-beef-bowls.jpg";
import whiteChickenChili from "@/assets/white-chicken-chili.jpg";
import zucchiniBread from "@/assets/zucchini-bread.jpg";
import cabbageRecipes from "@/assets/cabbage-recipes.jpg";
import chiaPudding from "@/assets/chia-pudding.jpg";

const recipes = [
  { image: chimichurri, title: "Chimichurri Steak", description: "Perfectly seared steak topped with fresh, vibrant chimichurri sauce — a crowd-pleasing classic.", category: "Grilling", date: "Apr 18, 2026", readTime: "8 min" },
  { image: hotHoney, title: "Hot Honey Glazed Bites", description: "Sweet heat meets crispy perfection in these irresistible hot honey drizzled appetizers.", category: "Appetizers", date: "Apr 16, 2026", readTime: "5 min" },
  { image: lasagnaSoup, title: "Lasagna Soup", description: "All the comforting flavors of lasagna in a cozy, soul-warming bowl of soup.", category: "Soups", date: "Apr 14, 2026", readTime: "12 min" },
  { image: marryMeChicken, title: "Marry Me Chicken", description: "Creamy sun-dried tomato sauce over tender chicken — the recipe that started a thousand proposals.", category: "Chicken", date: "Apr 12, 2026", readTime: "10 min" },
  { image: roastedChicken, title: "Rotisserie-Style Roasted Chicken", description: "Golden, juicy, and beautifully seasoned — this showstopper roast is easier than you think.", category: "Chicken", date: "Apr 10, 2026", readTime: "15 min" },
  { image: sweetPotatoBowls, title: "Sweet Potato Beef Bowls", description: "Hearty ground beef paired with roasted sweet potatoes, avocado, and fresh toppings.", category: "Bowls", date: "Apr 8, 2026", readTime: "9 min" },
  { image: whiteChickenChili, title: "White Chicken Chili", description: "A creamy, flavorful chili loaded with tender chicken, white beans, and zesty spices.", category: "Soups", date: "Apr 6, 2026", readTime: "11 min" },
  { image: zucchiniBread, title: "Classic Zucchini Bread", description: "Moist, nutty, and perfectly spiced — the ultimate way to use up garden zucchini.", category: "Baking", date: "Apr 4, 2026", readTime: "7 min" },
  { image: cabbageRecipes, title: "Roasted Cabbage Steaks", description: "Caramelized, tender cabbage wedges with bold seasoning — a stunning vegetable side dish.", category: "Sides", date: "Apr 2, 2026", readTime: "6 min" },
  { image: chiaPudding, title: "Overnight Chia Pudding", description: "Creamy, nutritious chia pudding with nuts and dried fruit — breakfast made effortless.", category: "Breakfast", date: "Mar 30, 2026", readTime: "4 min" },
];

const categories = [
  { name: "Chicken", icon: Drumstick, count: 24 },
  { name: "Soups", icon: Soup, count: 18 },
  { name: "Baking", icon: CakeSlice, count: 31 },
  { name: "Grilling", icon: Flame, count: 15 },
  { name: "Bowls", icon: Salad, count: 22 },
  { name: "Breakfast", icon: Egg, count: 19 },
];

const featured = recipes[0];
const heroSide = recipes.slice(1, 4);
const grid = recipes.slice(4);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="bg-foreground text-primary-foreground text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <span className="hidden sm:inline flex items-center gap-1"><Flame className="w-3 h-3 inline" /> New: 50+ Spring Recipes Just Added!</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-secondary transition-colors">Subscribe</a>
            <a href="#" className="hover:text-secondary transition-colors">Newsletter</a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-16 flex items-center justify-between">
            <Link to="/" className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-primary" /> RecipeSearch
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link to="/" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">Home</Link>
              <Link to="/categories" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">Categories</Link>
              <Link to="/popular" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">Popular</Link>
              <Link to="/about" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">About</Link>
              <Link to="/contact" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">Contact</Link>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                <Search className="w-5 h-5" />
              </button>
              <button className="hidden sm:inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>

          {/* Secondary Nav */}
          <div className="hidden lg:flex items-center gap-6 pb-3 text-xs font-medium text-muted-foreground border-t pt-3 -mt-px">
            {[
              { label: "Chicken", icon: Drumstick },
              { label: "Soups & Stews", icon: Soup },
              { label: "Baking", icon: CakeSlice },
              { label: "Grilling", icon: Flame },
              { label: "Healthy Bowls", icon: Salad },
              { label: "Breakfast", icon: Egg },
              { label: "Desserts", icon: Cookie },
              { label: "Quick Meals", icon: Sandwich },
            ].map((item) => (
              <a key={item.label} href="#" className="hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1.5">
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero — Blog Style */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main Featured Post */}
          <div className="lg:col-span-3 group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-[320px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3">
                <span className="bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">{featured.category}</span>
                <span className="text-white/70 text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime}</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-4xl font-bold text-white leading-tight">{featured.title}</h1>
              <p className="text-white/80 text-sm sm:text-base max-w-lg">{featured.description}</p>
              <div className="flex items-center gap-3 text-xs text-white/60 pt-1">
                <span>{featured.date}</span>
                <span>•</span>
                <span>By RecipeSearch Team</span>
              </div>
            </div>
          </div>

          {/* Side Posts */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {heroSide.map((recipe) => (
              <div key={recipe.title} className="group flex gap-4 bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer p-3">
                <div className="w-28 h-24 sm:w-32 sm:h-28 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-center space-y-1.5 min-w-0">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">{recipe.category}</span>
                  <h3 className="font-heading text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">{recipe.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{recipe.readTime}</span>
                    <span>•</span>
                    <span>{recipe.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Bar */}
      <section className="border-y bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground whitespace-nowrap">
            <TrendingUp className="w-4 h-4 text-accent" />
            Trending:
          </div>
          {["Marry Me Chicken", "Lasagna Soup", "Hot Honey", "Chia Pudding", "Zucchini Bread"].map((tag) => (
            <a key={tag} href="#" className="whitespace-nowrap text-sm text-muted-foreground hover:text-primary transition-colors">{tag}</a>
          ))}
        </div>
      </section>

      {/* Latest Recipes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Latest Recipes
          </h2>
          <a href="#" className="text-sm font-medium text-primary hover:text-accent transition-colors flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {grid.map((recipe) => (
            <RecipeCard key={recipe.title} {...recipe} />
          ))}
        </div>
      </section>

      {/* Browse by Category */}
      <section className="bg-card border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">Browse by Category</h2>
            <p className="text-muted-foreground">Find exactly what you're craving</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <a key={cat.name} href="#" className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-background hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20">
                <cat.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-semibold text-foreground">{cat.name}</span>
                <span className="text-xs text-muted-foreground">{cat.count} recipes</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Editor's Picks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">Editor's Picks</h2>
            <p className="text-muted-foreground text-sm mt-1">Hand-picked by our culinary team</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipes.slice(3, 5).map((recipe) => (
            <div key={recipe.title} className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md h-[280px]">
              <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 space-y-2">
                <span className="bg-primary/90 text-primary-foreground text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">{recipe.category}</span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">{recipe.title}</h3>
                <p className="text-white/80 text-sm max-w-md line-clamp-2">{recipe.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center space-y-6">
          <Mail className="w-10 h-10 mx-auto opacity-80" />
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">Get Recipes Delivered Weekly</h2>
          <p className="text-primary-foreground/80 max-w-md mx-auto">Join 50,000+ food lovers. New recipes, tips, and kitchen inspiration every Friday.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:border-primary-foreground/50"
            />
            <button className="px-6 py-3 bg-accent text-accent-foreground rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* About / Why Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: <Utensils className="w-8 h-8" />, title: "Tested Recipes", desc: "Every recipe is tested 3+ times in our kitchen before publishing." },
            { icon: <Clock className="w-8 h-8" />, title: "Quick & Easy", desc: "Most recipes ready in under 30 minutes with pantry staples." },
            { icon: <TrendingUp className="w-8 h-8" />, title: "Trending Daily", desc: "Discover what the world is cooking with real-time search data." },
          ].map((item) => (
            <div key={item.title} className="space-y-4 p-8 rounded-2xl hover:bg-card transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto">
                {item.icon}
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <span className="font-heading text-xl font-bold text-primary-foreground flex items-center gap-2 mb-4"><ChefHat className="w-5 h-5" /> RecipeSearch</span>
              <p className="text-sm leading-relaxed">Your daily source for the most searched recipes on the internet.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider">Explore</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
                <Link to="/categories" className="hover:text-primary-foreground transition-colors">Categories</Link>
                <Link to="/popular" className="hover:text-primary-foreground transition-colors">Popular</Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider">Company</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link to="/about" className="hover:text-primary-foreground transition-colors">About</Link>
                <Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link>
                <a href="#" className="hover:text-primary-foreground transition-colors">Privacy</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"><Youtube className="w-5 h-5" /></a>
                <a href="#" className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs">
            <p className="flex items-center justify-center gap-1">© 2026 RecipeSearch. Made with <Heart className="w-3.5 h-3.5 text-accent fill-accent" /> for food lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
