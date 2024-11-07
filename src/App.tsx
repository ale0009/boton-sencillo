import React, { useState } from 'react';
import { AlertContainer } from './components/AlertContainer';
import { AlertType } from './components/Alert';
import { ConfirmationAlert } from './components/ConfirmationAlert';
import { HelpCircle } from 'lucide-react';

interface AlertItem {
  id: string;
  type: AlertType;
  title: string;
  message: string;
}

function App() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Función para agregar alertas
  const addAlert = (type: AlertType, title: string, message: string) => {
    const newAlert = {
      id: Date.now().toString(),
      type,
      title,
      message,
    };
    setAlerts((prev) => [...prev, newAlert]);
    setTimeout(() => removeAlert(newAlert.id), 5000);
  };

  // Función para remover alertas
  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  // Manejadores de confirmación
  const handleConfirm = () => {
    setShowConfirmation(false);
    addAlert(
      'success',
      '¡Acción confirmada!',
      'Has elegido continuar con la acción.'
    );
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    addAlert(
      'info',
      'Acción cancelada',
      'Has decidido no continuar.'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center">
      {/* Contenedor de alertas */}
      <AlertContainer alerts={alerts} onDismiss={removeAlert} />
      
      {/* Modal de confirmación */}
      {showConfirmation && (
        <ConfirmationAlert
          title="¿Deseas continuar?"
          message="Por favor, confirma si deseas realizar esta acción."
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          confirmText="Sí"
          cancelText="No"
        />
      )}
      
      {/* Contenido principal */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-8 h-8 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-800">Toma una decisión</h1>
        </div>
        
        <p className="text-gray-600 mb-8 text-center">
          ¿Estás listo para tomar una decisión? Haz clic en el botón para elegir.
        </p>

        <button
          onClick={() => setShowConfirmation(true)}
          className="w-full py-3 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          Decidir ahora
        </button>
      </div>
    </div>
  );
}

export default App;