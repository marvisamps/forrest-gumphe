'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PencilSquareIcon, FilmIcon, DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Story } from './types/story';
import StoryGenerator from './components/StoryGenerator';

export default function Home() {
  const [story, setStory] = useState<Partial<Story> | null>(null);
  const [showResult, setShowResult] = useState(false);

  const steps = [
    { id: 1, name: 'Ideia Inicial', icon: PencilSquareIcon, description: 'Defina a premissa da sua história' },
    { id: 2, name: 'Desenvolvimento', icon: DocumentTextIcon, description: 'Plot e estrutura narrativa' },
    { id: 3, name: 'Estruturação', icon: FilmIcon, description: 'Personagens e cenas' }
  ];

  const handleCloseResult = () => setShowResult(false);

  return (
    <main>
      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="badge">
              <SparklesIcon className="icon" />
              <span>Potencializado por IA</span>
            </div>
            <h1 className="title">
              Desenvolvimento de História
            </h1>
            <p className="subtitle">
              Transforme suas ideias em histórias completas e estruturadas com ajuda de IA
            </p>
          </motion.div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="container">
        <div className="grid">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card"
            >
              <div className="card-content">
                <div className="card-icon">
                  <step.icon />
                </div>
                <div>
                  <span className="text-gray-500">Passo {step.id}</span>
                  <h3 className="card-title">{step.name}</h3>
                </div>
                <p className="card-description">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Generator Section */}
        <div className="generator-section">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="container">
              <StoryGenerator onStoryGenerated={(generatedStory) => {
                setStory(generatedStory);
                setShowResult(true);
              }} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      {showResult && story && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="modal-content"
          >
            <div className="modal-sections">
              {story.idea && (
                <section className="modal-section">
                  <h2 className="modal-title">
                    {story.idea.title}
                  </h2>
                  <p className="modal-text">{story.idea.expandedPremise}</p>
                </section>
              )}

              {story.plot && (
                <section className="modal-section">
                  <h3 className="modal-title">Plot</h3>
                  <p className="modal-text">{story.plot.content}</p>
                </section>
              )}

              {story.beatSheet && (
                <section className="modal-section">
                  <h3 className="modal-title">Beat Sheet</h3>
                  <ul className="modal-text">
                    {story.beatSheet.beats.map((beat, index) => (
                      <li key={index}>{beat}</li>
                    ))}
                  </ul>
                </section>
              )}

              {story.details && (
                <>
                  <section className="modal-section">
                    <h3 className="modal-title">Personagens</h3>
                    <div className="character-grid">
                      {story.details.characters.map((character, index) => (
                        <div key={index} className="character-card">
                          <h4 className="character-name">{character.name}</h4>
                          <p className="character-description">{character.description}</p>
                          <div className="character-arc">
                            Arco: {character.arc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="modal-section">
                    <h3 className="modal-title">Cenas</h3>
                    <div className="character-grid">
                      {story.details.scenes.map((scene, index) => (
                        <div key={index} className="character-card">
                          <h4 className="character-name">{scene.title}</h4>
                          <p className="character-description">{scene.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="modal-section">
                    <h3 className="modal-title">Temas</h3>
                    <div>
                      {story.details.themes.map((theme, index) => (
                        <span key={index} className="theme-tag">
                          {theme}
                        </span>
                      ))}
                    </div>
                  </section>
                </>
              )}

              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button onClick={handleCloseResult} className="button">
                  Fechar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
} 