import React, { useEffect, useState } from 'react';
import { useField } from 'payload/components/forms';

type PageOption = {
  pageName: string;
  pageSlug: string;
};

const PageReferenceSelect: React.FC<any> = (props) => {
  const { path, label, required } = props;
  const { value, setValue } = useField<string>({ path });

  const [options, setOptions] = useState<PageOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageList = async () => {
      try {
        const response = await fetch('/api/globals/appSettings', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch app settings');
        }

        const data = await response.json();
        
        if (data?.pageList && Array.isArray(data.pageList)) {
          setOptions(data.pageList);
        } else {
          setOptions([]);
        }
      } catch (err) {
        console.error('Error fetching page list:', err);
        setError('Nie udało się załadować listy stron');
      } finally {
        setLoading(false);
      }
    };

    fetchPageList();
  }, []);

  if (loading) {
    return (
      <div className="field-type">
        <label className="field-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
        <div>Ładowanie...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="field-type">
        <label className="field-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
        <div style={{ color: 'red' }}>{error}</div>
      </div>
    );
  }

  return (
    <div className="field-type">
      <label className="field-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <select
        value={(value as string) || ''}
        onChange={(e) => setValue(e.target.value)}
        className="field-input"
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      >
        <option value="">Wybierz stronę...</option>
        {options.map((page) => (
          <option key={page.pageSlug} value={page.pageSlug}>
            {page.pageName} ({page.pageSlug})
          </option>
        ))}
      </select>
      <div style={{ marginTop: '4px', fontSize: '12px', color: '#666' }}>
        Lista stron jest zarządzana w Ustawieniach Aplikacji
      </div>
    </div>
  );
};

export default PageReferenceSelect;
