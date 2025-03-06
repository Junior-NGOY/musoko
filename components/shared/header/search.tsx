import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { categories } from "@/lib/constants";
 
export default function Search() {
  const t = useTranslations('Search');
  const tc = useTranslations('Categories');

  return (
    <form action="/search" method="GET" className="flex items-stretch h-10">
      <Select name="category">
        <SelectTrigger className="w-auto h-full dark:border-gray-200 bg-gray-100 text-black border-r rounded-r-none rounded-l-md">
          <SelectValue placeholder={t('All')} />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          <SelectItem value="all">{t('All')}</SelectItem>
          {categories.map((category) => (
            <SelectGroup key={category.name}>
              <SelectLabel>{tc(category.name)}</SelectLabel>
              {category.subcategories.map((subcat) => (
                <SelectItem 
                  key={`${category.name}-${subcat}`} 
                  value={`${category.name.toLowerCase()}-${subcat.toLowerCase().replace(' ', '-')}`}
                >
                  {tc(subcat)}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
      <Input
        className="flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-full"
        placeholder={t('Search Products')}
        name="q"
        type="search"
      />
      <button
        type="submit"
        className="bg-primary text-primary-foreground text-black rounded-s-none rounded-e-md h-full px-3 py-2"
      >
        <SearchIcon className="w-6 h-6" />
      </button>
    </form>
  );
}