'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Plot, BeatSheet } from '../../types/story';

interface DesenvolvimentoProps {
  onSubmit: (data: { plot: Plot; beatSheet: BeatSheet }) => void;
}

export default function Desenvolvimento({ onSubmit }: DesenvolvimentoProps) {
  const [plot, setPlot] = useState<Plot>({
    mainPlot: '',
    subplots: [''],
  });

  const [beatSheet, setBeatSheet] = useState<BeatSheet>({
    openingImage: '',
    setup: '',
    catalyst: '',
    debate: '',
    breakIntoTwo: '',
    bPlot: '',
    funAndGames: '',
    midpoint: '',
    badGuysCloseIn: '',
    allIsLost: '',
    darkNightOfSoul: '',
    breakIntoThree: '',
    finale: '',
    finalImage: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ plot, beatSheet });
  };

  const addSubplot = () => {
    setPlot({
      ...plot,
      subplots: [...plot.subplots, ''],
    });
  };

  const updateSubplot = (index: number, value: string) => {
    const newSubplots = [...plot.subplots];
    newSubplots[index] = value;
    setPlot({
      ...plot,
      subplots: newSubplots,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-zinc-100">Enredo Principal</h3>
          
          <div>
            <label htmlFor="mainPlot" className="form-label">
              Trama Principal
            </label>
            <div className="mt-1">
              <textarea
                id="mainPlot"
                rows={4}
                value={plot.mainPlot}
                onChange={(e) => setPlot({ ...plot, mainPlot: e.target.value })}
                className="form-textarea input-field"
                placeholder="Descreva a trama principal da sua história..."
              />
            </div>
          </div>

          <div>
            <label className="form-label">
              Subtramas
            </label>
            {plot.subplots.map((subplot, index) => (
              <div key={index} className="mt-1">
                <textarea
                  rows={2}
                  value={subplot}
                  onChange={(e) => updateSubplot(index, e.target.value)}
                  className="form-textarea input-field mb-2"
                  placeholder={`Subtrama ${index + 1}...`}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addSubplot}
              className="mt-2 text-sm text-blue-400 hover:text-blue-500"
            >
              + Adicionar Subtrama
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-zinc-100">Beat Sheet</h3>
          
          {Object.entries(beatSheet).map(([key, value]) => (
            <div key={key}>
              <label htmlFor={key} className="form-label capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <div className="mt-1">
                <textarea
                  id={key}
                  rows={2}
                  value={value}
                  onChange={(e) => setBeatSheet({ ...beatSheet, [key]: e.target.value })}
                  className="form-textarea input-field"
                  placeholder={`Descreva ${key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}...`}
                />
              </div>
            </div>
          ))}
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