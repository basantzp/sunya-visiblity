import { describe, expect, it } from 'vitest';
import { resolveTemplateType } from '@/lib/templates';

describe('Template Resolver (Multi-Template Engine)', () => {
  it('should map food & dining categories to restaurant template', () => {
    expect(resolveTemplateType('Restaurant')).toBe('restaurant');
    expect(resolveTemplateType('Local Cafe & Bakery')).toBe('restaurant');
    expect(resolveTemplateType('Himalayan Momo Corner')).toBe('restaurant');
    expect(resolveTemplateType('Traditional Nepali Food')).toBe('restaurant');
  });

  it('should map wellness, spa and ayurveda to wellness template', () => {
    expect(resolveTemplateType('Ayurvedic Spa & Herbal Clinic')).toBe('wellness');
    expect(resolveTemplateType('Beauty Salon & Massage')).toBe('wellness');
    expect(resolveTemplateType('Holistic Wellness Center')).toBe('wellness');
  });

  it('should map retail, crafts, clothing, and boutique to retail template', () => {
    expect(resolveTemplateType('Handicrafts Boutique')).toBe('retail');
    expect(resolveTemplateType('Pashmina Store')).toBe('retail');
    expect(resolveTemplateType('Traditional Pottery Shop')).toBe('retail');
    expect(resolveTemplateType('Silver Jewelry Craft')).toBe('retail');
    expect(resolveTemplateType('Clothing & Handloom Boutique')).toBe('retail');
  });

  it('should fallback to services template for hotels and general professional services', () => {
    expect(resolveTemplateType('Boutique Hotel & Resort')).toBe('services');
    expect(resolveTemplateType('Heritage Lodge & Hospitality')).toBe('services');
    expect(resolveTemplateType('Accounting Consultancy')).toBe('services');
    expect(resolveTemplateType('Dental Clinic')).toBe('services');
    expect(resolveTemplateType('Driving School')).toBe('services');
  });
});
