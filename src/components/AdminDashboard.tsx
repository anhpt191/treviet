import React, { useState, useRef } from 'react';
import { useContent, ContentData } from '../context/ContentContext';
import { Link } from 'react-router-dom';
import { Save, ArrowLeft, RotateCcw, Upload, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminDashboard() {
  const { content, updateContent, resetContent } = useContent();
  const [formData, setFormData] = useState<ContentData>(content);
  const [activeTab, setActiveTab] = useState<'seo' | 'hero' | 'about' | 'menu' | 'contact' | 'spices'>('seo');
  const [saveMessage, setSaveMessage] = useState('');

  const handleChange = (section: keyof ContentData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedChange = (section: keyof ContentData, parentField: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentField]: {
          // @ts-ignore
          ...prev[section][parentField],
          [field]: value
        }
      }
    }));
  };

  const handleMenuItemChange = (index: number, field: string, value: any) => {
    const newItems = [...formData.menu.items];
    // @ts-ignore
    newItems[index][field] = value;
    setFormData(prev => ({
      ...prev,
      menu: {
        ...prev.menu,
        items: newItems
      }
    }));
  };

  const handleAddMenuItem = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      description: '',
      price: '',
      image: ''
    };
    setFormData(prev => ({
      ...prev,
      menu: {
        ...prev.menu,
        items: [...prev.menu.items, newItem]
      }
    }));
  };

  const handleRemoveMenuItem = (index: number) => {
    const newItems = [...formData.menu.items];
    newItems.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      menu: {
        ...prev.menu,
        items: newItems
      }
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (supabase) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        callback(data.publicUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        setSaveMessage('Fehler beim Hochladen!');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } else {
      // Fallback to Base64 if Supabase is not configured
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const ImageInput = ({ label, value, onChange, objectFit = 'cover' }: { label: string, value: string, onChange: (v: string) => void, objectFit?: 'cover' | 'contain' }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex gap-2">
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
          placeholder="URL eingeben oder Bild hochladen..."
        />
        <label className="cursor-pointer bg-tre-dark text-tre-cream px-4 py-2 rounded hover:bg-tre-gold hover:text-tre-dark transition-colors flex items-center justify-center gap-2">
          <Upload size={16} />
          <span className="hidden sm:inline">Upload</span>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => handleImageUpload(e, onChange)} 
          />
        </label>
      </div>
      {value && (
        <img src={value} alt="Preview" className={`mt-2 h-32 w-auto object-${objectFit} rounded bg-gray-100`} />
      )}
    </div>
  );

  const handleSave = async () => {
    const success = await updateContent(formData);
    if (success) {
      setSaveMessage('Gespeichert!');
    } else {
      setSaveMessage('Lưu thất bại! (Supabase mất kết nối)');
    }
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleReset = () => {
    resetContent();
    setFormData(content);
    setSaveMessage('Zurückgesetzt!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const tabs = [
    { id: 'seo', label: 'SEO & Meta' },
    { id: 'hero', label: 'Hero Section' },
    { id: 'about', label: 'Über Uns' },
    { id: 'menu', label: 'Speisekarte' },
    { id: 'contact', label: 'Kontakt' },
    { id: 'spices', label: 'Zutaten (Banner)' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Admin Header */}
      <div className="bg-tre-dark text-tre-cream p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="font-serif text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            {!useContent().isConnected && (
              <span className="bg-red-500/20 text-red-200 px-3 py-1 rounded-full text-xs font-bold border border-red-500/50 animate-pulse">
                Supabase Disconnected
              </span>
            )}
            {saveMessage && (
              <span className="text-tre-gold font-medium animate-pulse">{saveMessage}</span>
            )}
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 hover:bg-red-500/40 rounded transition-colors text-sm"
            >
              <RotateCcw size={16} /> Reset
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-tre-gold text-tre-dark font-bold rounded hover:bg-white transition-colors"
            >
              <Save size={18} /> Speichern
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="md:col-span-1 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full text-left px-4 py-3 rounded transition-colors ${
                activeTab === tab.id 
                  ? 'bg-tre-dark text-tre-gold font-bold shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 bg-white rounded-xl shadow-sm p-8">
          
          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-tre-dark mb-6">SEO Einstellungen</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seitentitel</label>
                  <input 
                    type="text" 
                    value={formData.seo.title}
                    onChange={(e) => handleChange('seo', 'title', e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung (Meta Description)</label>
                  <textarea 
                    rows={3}
                    value={formData.seo.description}
                    onChange={(e) => handleChange('seo', 'description', e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (kommagetrennt)</label>
                  <input 
                    type="text" 
                    value={formData.seo.keywords}
                    onChange={(e) => handleChange('seo', 'keywords', e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Hero Tab */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-tre-dark mb-6">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Haupttitel</label>
                  <input 
                    type="text" 
                    value={formData.hero.title}
                    onChange={(e) => handleChange('hero', 'title', e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Untertitel</label>
                  <input 
                    type="text" 
                    value={formData.hero.subtitle}
                    onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                  <input 
                    type="text" 
                    value={formData.hero.buttonText}
                    onChange={(e) => handleChange('hero', 'buttonText', e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Öffnungszeiten (Hero Banner)</label>
                  <input 
                    type="text" 
                    value={formData.hero.openingHours || ''}
                    onChange={(e) => handleChange('hero', 'openingHours', e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                    placeholder="z.B. Montag: 17:00 - 22:00 Uhr | Di-So: 11:00 - 15:00 & 17:00 - 22:00 Uhr"
                  />
                </div>
                <ImageInput 
                  label="Hintergrundbild (URL oder Upload)" 
                  value={formData.hero.backgroundImage} 
                  onChange={(val) => handleChange('hero', 'backgroundImage', val)} 
                />
                <ImageInput 
                  label="Logo Bild (URL oder Upload, PNG empfohlen)" 
                  value={formData.hero.logoImage} 
                  onChange={(val) => handleChange('hero', 'logoImage', val)} 
                  objectFit="contain"
                />
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-tre-dark mb-6">Über Uns</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
                    <input 
                      type="text" 
                      value={formData.about.title}
                      onChange={(e) => handleChange('about', 'title', e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Untertitel</label>
                    <input 
                      type="text" 
                      value={formData.about.subtitle}
                      onChange={(e) => handleChange('about', 'subtitle', e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text Abschnitt 1</label>
                  <textarea 
                    rows={4}
                    value={formData.about.text1}
                    onChange={(e) => handleChange('about', 'text1', e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text Abschnitt 2</label>
                  <textarea 
                    rows={4}
                    value={formData.about.text2}
                    onChange={(e) => handleChange('about', 'text2', e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {['image1', 'image2', 'image3', 'image4', 'image5'].map((imgField, idx) => (
                     <div key={imgField}>
                       <ImageInput 
                         label={`Bild ${idx + 1} (URL oder Upload)`}
                         // @ts-ignore
                         value={formData.about[imgField]}
                         onChange={(val) => handleChange('about', imgField, val)}
                       />
                     </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {/* Menu Tab */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-tre-dark mb-6">Speisekarte (Vorschau)</h2>
              <div className="space-y-4 mb-8">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sektionstitel</label>
                    <input 
                      type="text" 
                      value={formData.menu.title}
                      onChange={(e) => handleChange('menu', 'title', e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Untertitel</label>
                    <input 
                      type="text" 
                      value={formData.menu.subtitle}
                      onChange={(e) => handleChange('menu', 'subtitle', e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                    />
                  </div>
              </div>

              <div className="space-y-6">
                {formData.menu.items.map((item, index) => (
                  <div key={item.id} className="p-4 border rounded-lg bg-gray-50 relative">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-tre-dark">Gericht #{index + 1}</h4>
                      <button 
                        onClick={() => handleRemoveMenuItem(index)}
                        className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50 transition-colors"
                        title="Gericht löschen"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                        <input 
                          type="text" 
                          value={item.name}
                          onChange={(e) => handleMenuItemChange(index, 'name', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Preis</label>
                        <input 
                          type="text" 
                          value={item.price}
                          onChange={(e) => handleMenuItemChange(index, 'price', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Beschreibung</label>
                        <input 
                          type="text" 
                          value={item.description}
                          onChange={(e) => handleMenuItemChange(index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <ImageInput 
                          label="Bild (URL oder Upload)"
                          value={item.image}
                          onChange={(val) => handleMenuItemChange(index, 'image', val)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={handleAddMenuItem}
                  className="w-full py-4 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg hover:border-tre-gold hover:text-tre-gold transition-colors flex flex-col items-center justify-center gap-2"
                >
                  <Plus size={24} />
                  <span className="font-medium">Neues Gericht hinzufügen (Thêm món mới)</span>
                </button>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-tre-dark mb-6">Kontakt & Öffnungszeiten</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
                    <input 
                      type="text" 
                      value={formData.contact.title}
                      onChange={(e) => handleChange('contact', 'title', e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Untertitel</label>
                    <input 
                      type="text" 
                      value={formData.contact.subtitle}
                      onChange={(e) => handleChange('contact', 'subtitle', e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                    />
                  </div>
                </div>
                <ImageInput 
                  label="Bild (URL oder Upload)"
                  value={formData.contact.image}
                  onChange={(val) => handleChange('contact', 'image', val)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Straße</label>
                    <input 
                      type="text" 
                      value={formData.contact.address.street}
                      onChange={(e) => handleNestedChange('contact', 'address', 'street', e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stadt/PLZ</label>
                    <input 
                      type="text" 
                      value={formData.contact.address.city}
                      onChange={(e) => handleNestedChange('contact', 'address', 'city', e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input 
                      type="text" 
                      value={formData.contact.phone}
                      onChange={(e) => handleChange('contact', 'phone', e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="text" 
                      value={formData.contact.email}
                      onChange={(e) => handleChange('contact', 'email', e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Link</label>
                  <input 
                    type="text" 
                    value={formData.contact.googleMapsLink}
                    onChange={(e) => handleChange('contact', 'googleMapsLink', e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                  />
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-bold mb-4">Öffnungszeiten</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Wochentage</label>
                      <input 
                        type="text" 
                        value={formData.contact.openingHours.weekdays}
                        onChange={(e) => handleNestedChange('contact', 'openingHours', 'weekdays', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ruhetag</label>
                      <input 
                        type="text" 
                        value={formData.contact.openingHours.closedDay}
                        onChange={(e) => handleNestedChange('contact', 'openingHours', 'closedDay', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Zeiten (Mittag)</label>
                      <input 
                        type="text" 
                        value={formData.contact.openingHours.weekdayHours}
                        onChange={(e) => handleNestedChange('contact', 'openingHours', 'weekdayHours', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Zeiten (Abend)</label>
                      <input 
                        type="text" 
                        value={formData.contact.openingHours.weekendHours}
                        onChange={(e) => handleNestedChange('contact', 'openingHours', 'weekendHours', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Spices Tab */}
          {activeTab === 'spices' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-tre-dark mb-6">Zutaten Banner</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
                  <input 
                    type="text" 
                    value={formData.spices.title}
                    onChange={(e) => handleChange('spices', 'title', e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Untertitel</label>
                  <input 
                    type="text" 
                    value={formData.spices.subtitle}
                    onChange={(e) => handleChange('spices', 'subtitle', e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-tre-gold focus:border-transparent"
                  />
                </div>
                <ImageInput 
                  label="Bild (URL oder Upload)"
                  value={formData.spices.image}
                  onChange={(val) => handleChange('spices', 'image', val)}
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
