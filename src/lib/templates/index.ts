import { RestaurantTemplate } from './RestaurantTemplate';
import { RetailTemplate } from './RetailTemplate';
import { ServicesTemplate } from './ServicesTemplate';
import { WellnessTemplate } from './WellnessTemplate';

export type TemplateType = 'restaurant' | 'wellness' | 'retail' | 'services';

export function resolveTemplateType(category: string): TemplateType {
  const cat = category.toLowerCase();
  if (
    cat.includes('restaurant') ||
    cat.includes('cafe') ||
    cat.includes('momo') ||
    cat.includes('bakery') ||
    cat.includes('bar') ||
    cat.includes('food')
  ) {
    return 'restaurant';
  }
  if (
    cat.includes('spa') ||
    cat.includes('salon') ||
    cat.includes('wellness') ||
    cat.includes('massage') ||
    cat.includes('ayurveda') ||
    cat.includes('beauty')
  ) {
    return 'wellness';
  }
  if (cat.includes('boutique') || cat.includes('craft') || cat.includes('store') || cat.includes('shop') || cat.includes('flower') || cat.includes('flora') || cat.includes('nursery') || cat.includes('clothing') || cat.includes('jewelry') || cat.includes('pottery')) {
    return 'retail';
  }
  return 'services';
}

export function getTemplateComponent(type: TemplateType) {
  switch (type) {
    case 'restaurant':
      return RestaurantTemplate;
    case 'wellness':
      return WellnessTemplate;
    case 'retail':
      return RetailTemplate;
    case 'services':
      return ServicesTemplate;
    default:
      return RestaurantTemplate;
  }
}

export { RestaurantTemplate, WellnessTemplate, RetailTemplate, ServicesTemplate };
