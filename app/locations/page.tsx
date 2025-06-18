"use client"

export default function LocationsPage() {
  return (
    <div className="px-4 lg:px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#191011] dark:text-white tracking-light text-[32px] font-bold leading-tight">
              Nuestras Ubicaciones
            </p>
            <p className="text-[#8b5b5d] dark:text-gray-400 text-sm font-normal leading-normal">
              Encuentra un Pizza Palace cerca de ti y disfruta de nuestras deliciosas pizzas.
            </p>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="space-y-6 p-4">
          {/* Location 1 - Centro */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div
                  className="h-48 md:h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
                  }}
                ></div>
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-[#191011] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-2">
                  Pizza Palace Centro
                </h3>
                <div className="space-y-2 mb-4">
                  <p className="text-[#8b5b5d] dark:text-gray-400 text-base font-normal leading-normal">
                    📍 Av. Principal 123, Centro Histórico
                  </p>
                  <p className="text-[#8b5b5d] dark:text-gray-400 text-base font-normal leading-normal">
                    📞 (555) 123-4567
                  </p>
                  <p className="text-[#8b5b5d] dark:text-gray-400 text-base font-normal leading-normal">
                    🕒 Lun-Dom: 11:00 AM - 11:00 PM
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href="/menu"
                    className="bg-[#e8b4b7] text-[#191011] px-4 py-2 rounded-full font-bold hover:bg-[#d4a1a4] transition-colors"
                  >
                    Ordenar Ahora
                  </a>
                  <button
                    onClick={() => window.open("https://maps.google.com", "_blank")}
                    className="bg-[#f1e9ea] dark:bg-gray-700 text-[#191011] dark:text-white px-4 py-2 rounded-full font-medium hover:bg-[#e8b4b7] dark:hover:bg-gray-600 transition-colors"
                  >
                    Ver en Mapa
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Location 2 - Norte */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div
                  className="h-48 md:h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
                  }}
                ></div>
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-[#191011] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-2">
                  Pizza Palace Norte
                </h3>
                <div className="space-y-2 mb-4">
                  <p className="text-[#8b5b5d] dark:text-gray-400 text-base font-normal leading-normal">
                    📍 Blvd. Norte 456, Plaza Comercial Norte
                  </p>
                  <p className="text-[#8b5b5d] dark:text-gray-400 text-base font-normal leading-normal">
                    📞 (555) 234-5678
                  </p>
                  <p className="text-[#8b5b5d] dark:text-gray-400 text-base font-normal leading-normal">
                    🕒 Lun-Dom: 10:00 AM - 12:00 AM
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href="/menu"
                    className="bg-[#e8b4b7] text-[#191011] px-4 py-2 rounded-full font-bold hover:bg-[#d4a1a4] transition-colors"
                  >
                    Ordenar Ahora
                  </a>
                  <button
                    onClick={() => window.open("https://maps.google.com", "_blank")}
                    className="bg-[#f1e9ea] dark:bg-gray-700 text-[#191011] dark:text-white px-4 py-2 rounded-full font-medium hover:bg-[#e8b4b7] dark:hover:bg-gray-600 transition-colors"
                  >
                    Ver en Mapa
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Location 3 - Sur */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div
                  className="h-48 md:h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
                  }}
                ></div>
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-[#191011] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-2">
                  Pizza Palace Sur
                </h3>
                <div className="space-y-2 mb-4">
                  <p className="text-[#8b5b5d] dark:text-gray-400 text-base font-normal leading-normal">
                    📍 Av. Sur 789, Centro Comercial Sur
                  </p>
                  <p className="text-[#8b5b5d] dark:text-gray-400 text-base font-normal leading-normal">
                    📞 (555) 345-6789
                  </p>
                  <p className="text-[#8b5b5d] dark:text-gray-400 text-base font-normal leading-normal">
                    🕒 Lun-Dom: 11:00 AM - 10:00 PM
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href="/menu"
                    className="bg-[#e8b4b7] text-[#191011] px-4 py-2 rounded-full font-bold hover:bg-[#d4a1a4] transition-colors"
                  >
                    Ordenar Ahora
                  </a>
                  <button
                    onClick={() => window.open("https://maps.google.com", "_blank")}
                    className="bg-[#f1e9ea] dark:bg-gray-700 text-[#191011] dark:text-white px-4 py-2 rounded-full font-medium hover:bg-[#e8b4b7] dark:hover:bg-gray-600 transition-colors"
                  >
                    Ver en Mapa
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-[#e8b4b7] bg-opacity-20 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-[#191011] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-4">
              Servicio a Domicilio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-[#191011] dark:text-white mb-2">Horarios de Entrega</h4>
                <ul className="text-[#8b5b5d] dark:text-gray-400 space-y-1">
                  <li>Lunes - Jueves: 11:00 AM - 10:00 PM</li>
                  <li>Viernes - Sábado: 11:00 AM - 11:00 PM</li>
                  <li>Domingo: 12:00 PM - 10:00 PM</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#191011] dark:text-white mb-2">Información de Entrega</h4>
                <ul className="text-[#8b5b5d] dark:text-gray-400 space-y-1">
                  <li>• Costo de entrega: $2.99</li>
                  <li>• Tiempo estimado: 30-45 min</li>
                  <li>• Pedido mínimo: $15.00</li>
                  <li>• Área de cobertura: 10 km</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
