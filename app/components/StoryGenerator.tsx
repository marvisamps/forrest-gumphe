'use client';

import { useState } from 'react';
import { Story, StoryIdea, Plot, BeatSheet, StoryDetails } from '../types/story';
import { generateFromPremise, generatePlotAndBeatSheet, generateStoryDetails } from '../services/storyAI';
import { SparklesIcon } from '@heroicons/react/24/outline';

interface StoryGeneratorProps {
  onStoryGenerated: (story: Partial<Story>) => void;
}

export default function StoryGenerator({ onStoryGenerated }: StoryGeneratorProps) {
  const [premise, setPremise] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<string>('');

  const handlePremiseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const story: Partial<Story> = {};

    try {
      // Gerar título e premissa expandida
      setCurrentStep('Gerando título e premissa...');
      const storyIdea = await generateFromPremise(premise);
      story.idea = storyIdea;
      onStoryGenerated(story);

      // Gerar plot e beatsheet
      setCurrentStep('Desenvolvendo plot e estrutura...');
      const { plot, beatSheet } = await generatePlotAndBeatSheet(storyIdea);
      story.plot = plot;
      story.beatSheet = beatSheet;
      onStoryGenerated({ ...story });

      // Gerar detalhes da história
      setCurrentStep('Criando personagens e cenas...');
      const details = await generateStoryDetails(storyIdea, plot, beatSheet);
      story.details = details;
      onStoryGenerated({ ...story });

      setCurrentStep('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao gerar a história');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="story-generator">
      <form onSubmit={handlePremiseSubmit}>
        <div className="form-group">
          <label htmlFor="premise" className="form-label">
            Digite a premissa da sua história
          </label>
          <div className="textarea-wrapper">
            <textarea
              id="premise"
              name="premise"
              value={premise}
              onChange={(e) => setPremise(e.target.value)}
              className="story-input"
              placeholder="Ex: Um cientista solitário descobre uma forma de se comunicar com seu eu do passado através de um antigo rádio..."
              disabled={loading}
            />
          </div>
        </div>
        <div className="form-actions">
          <button
            type="submit"
            disabled={loading || !premise.trim()}
            className="generate-button"
          >
            <div className="button-content">
              {loading ? (
                <>
                  <svg className="loading-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="spinner-head" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{currentStep || 'Gerando...'}</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="sparkles-icon" />
                  <span>Gerar História</span>
                </>
              )}
            </div>
          </button>
          {loading && (
            <div className="loading-message">
              <div className="loading-dot" />
              Isso pode levar alguns segundos...
            </div>
          )}
        </div>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
} 