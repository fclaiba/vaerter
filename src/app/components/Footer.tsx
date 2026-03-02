import { Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold tracking-tighter mb-6">VAERTER</h2>
          <p className="text-gray-400 max-w-sm mb-8">
            Impresión 3D de alta fidelidad. Llevamos tus ideas del plano digital a la realidad física con precisión milimétrica.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={Instagram} />
            <SocialIcon icon={Linkedin} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Explorar</h3>
          <ul className="space-y-4">
            <li><a href="#retail" className="text-gray-300 hover:text-white transition-colors">Minorista</a></li>
            <li><a href="#wholesale" className="text-gray-300 hover:text-white transition-colors">Mayorista</a></li>
            <li><a href="#materials" className="text-gray-300 hover:text-white transition-colors">Materiales</a></li>
            <li><a href="#process" className="text-gray-300 hover:text-white transition-colors">Cómo funciona</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Contacto</h3>
          <ul className="space-y-4 text-gray-300">
            <li>La Plata, Buenos Aires</li>
            <li>consultas@vaerter.com.ar</li>
            <li className="flex items-center gap-2 mt-4 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Respuesta en &lt; 2hs
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>&copy; 2024 VAERTER 3D Printing. Todos los derechos reservados.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-400">Privacidad</a>
          <a href="#" className="hover:text-gray-400">Términos</a>
        </div>
      </div>


    </footer>
  );
}

function SocialIcon({ icon: Icon }: { icon: any }) {
  return (
    <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
      <Icon className="w-5 h-5" />
    </a>
  );
}
