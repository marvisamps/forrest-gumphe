'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { StoryDetails, SceneOutline } from '../../types/story';

interface EstruturacaoProps {
  onSubmit: (data: { storyDetails: StoryDetails; sceneOutline: SceneOutline[] }) => void;
}

export default function Estruturacao({ onSubmit }: EstruturacaoProps) {
  const [storyDetails, setStoryDetails] = useState<StoryDetails>({
    logline: '',
    synopsis: '',
    treatment: '',
  });

  const [sceneOutline, setSceneOutline] = useState<SceneOutline[]>([{
    id: Date.now().toString(),
    sceneNumber: 1,
    location: '',
    timeOfDay: '',
    description: '',
    characters: [''],
  }]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ storyDetails, sceneOutline });
  };

  const addScene = () => {
    setSceneOutline([
      ...sceneOutline,
      {
        id: Date.now().toString(),
        sceneNumber: sceneOutline.length + 1,
        location: '',
        timeOfDay: '',
        description: '',
        characters: [''],
      },
    ]);
  };

  const updateScene = (index: number, field: keyof SceneOutline, value: any) => {
    const newScenes = [...sceneOutline];
    newScenes[index] = {
      ...newScenes[index],
      [field]: value,
    };
    setSceneOutline(newScenes);
  };

  const addCharacterToScene = (sceneIndex: number) => {
    const newScenes = [...sceneOutline];
    newScenes[sceneIndex].characters.push('');
    setSceneOutline(newScenes);
  };

  const updateCharacterInScene = (sceneIndex: number, charIndex: number, value: string) => {
    const newScenes = [...sceneOutline];
    newScenes[sceneIndex].characters[charIndex] = value;
    setSceneOutline(newScenes);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-zinc-100">Detalhes da História</h3>
          
          <div>
            <label htmlFor="logline" className="form-label">
              Logline
            </label>
            <div className="mt-1">
              <textarea
                id="logline"
                rows={2}
                value={storyDetails.logline}
                onChange={(e) => setStoryDetails({ ...storyDetails, logline: e.target.value })}
                className="form-textarea input-field"
                placeholder="Escreva uma breve descrição da sua história em uma ou duas frases..."
              />
            </div>
          </div>

          <div>
            <label htmlFor="synopsis" className="form-label">
              Sinopse
            </label>
            <div className="mt-1">
              <textarea
                id="synopsis"
                rows={4}
                value={storyDetails.synopsis}
                onChange={(e) => setStoryDetails({ ...storyDetails, synopsis: e.target.value })}
                className="form-textarea input-field"
                placeholder="Desenvolva um resumo mais detalhado da história..."
              />
            </div>
          </div>

          <div>
            <label htmlFor="treatment" className="form-label">
              Argumento
            </label>
            <div className="mt-1">
              <textarea
                id="treatment"
                rows={6}
                value={storyDetails.treatment}
                onChange={(e) => setStoryDetails({ ...storyDetails, treatment: e.target.value })}
                className="form-textarea input-field"
                placeholder="Desenvolva o argumento completo da história..."
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-zinc-100">Escaleta</h3>
            <button
              type="button"
              onClick={addScene}
              className="text-sm text-blue-400 hover:text-blue-500"
            >
              + Adicionar Cena
            </button>
          </div>

          {sceneOutline.map((scene, index) => (
            <div key={scene.id} className="p-4 bg-zinc-800 rounded-lg space-y-4">
              <div className="flex gap-4">
                <div className="w-1/4">
                  <label className="form-label">
                    Localização
                  </label>
                  <input
                    type="text"
                    value={scene.location}
                    onChange={(e) => updateScene(index, 'location', e.target.value)}
                    className="form-input input-field mt-1"
                  />
                </div>
                <div className="w-1/4">
                  <label className="form-label">
                    Horário
                  </label>
                  <input
                    type="text"
                    value={scene.timeOfDay}
                    onChange={(e) => updateScene(index, 'timeOfDay', e.target.value)}
                    className="form-input input-field mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">
                  Descrição da Cena
                </label>
                <textarea
                  rows={3}
                  value={scene.description}
                  onChange={(e) => updateScene(index, 'description', e.target.value)}
                  className="form-textarea input-field mt-1"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="form-label">
                    Personagens
                  </label>
                  <button
                    type="button"
                    onClick={() => addCharacterToScene(index)}
                    className="text-sm text-blue-400 hover:text-blue-500"
                  >
                    + Adicionar Personagem
                  </button>
                </div>
                <div className="space-y-2">
                  {scene.characters.map((char, charIndex) => (
                    <input
                      key={charIndex}
                      type="text"
                      value={char}
                      onChange={(e) => updateCharacterInScene(index, charIndex, e.target.value)}
                      className="form-input input-field"
                      placeholder={`Personagem ${charIndex + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-primary"
          >
            Finalizar
          </button>
        </div>
      </form>
    </motion.div>
  );
} 