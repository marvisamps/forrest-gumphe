'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { StoryIdea } from '../../types/story';

interface IdeiaInicialProps {
  onSubmit: (idea: StoryIdea) => void;
}

export default function IdeiaInicial({ onSubmit }: IdeiaInicialProps) {
  const [formData, setFormData] = useState<StoryIdea>({
    id: Date.now().toString(),
    title: '',
    premise: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="form-label">
            Título da História
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="form-input input-field"
              placeholder="Digite o título da sua história"
            />
          </div>
        </div>

        <div>
          <label htmlFor="premise" className="form-label">
            Premissa
          </label>
          <div className="mt-1">
            <textarea
              id="premise"
              rows={4}
              value={formData.premise}
              onChange={(e) => setFormData({ ...formData, premise: e.target.value })}
              className="form-textarea input-field"
              placeholder="Descreva a ideia principal da sua história em poucas palavras..."
            />
          </div>
          <p className="mt-2 text-sm text-zinc-400">
            Escreva uma breve descrição da sua ideia. Isso servirá como base para o desenvolvimento posterior.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-primary"
          >
            Próximo Passo
          </button>
        </div>
      </form>
    </motion.div>
  );
} 