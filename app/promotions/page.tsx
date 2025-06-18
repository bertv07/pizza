import Link from "next/link"

export default function PromotionsPage() {
  return (
    <div className="px-4 lg:px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#191011] dark:text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            Promociones Actuales
          </p>
        </div>

        {/* Promotions Grid */}
        <div className="space-y-6 p-4">
          {/* Family Feast Deal */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div
                  className="h-48 md:h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
                  }}
                ></div>
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-[#191011] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-2">
                  Combo Familiar
                </h3>
                <p className="text-[#8b5b5d] dark:text-gray-400 text-base font-normal leading-normal mb-4">
                  Disfruta de una pizza grande, acompañamiento de palitos de ajo y una bebida de 2 litros por solo $25.
                  ¡Perfecto para una noche familiar!
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-[#e8b4b7]">$25.00</span>
                    <span className="text-sm text-[#8b5b5d] dark:text-gray-400 line-through ml-2">$32.97</span>
                  </div>
                  <Link
                    href="/menu"
                    className="bg-[#e8b4b7] text-[#191011] px-6 py-2 rounded-full font-bold hover:bg-[#d4a1a4] transition-colors"
                  >
                    Ordenar Ahora
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Lunch Special */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div
                  className="h-48 md:h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
                  }}
                ></div>
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-[#191011] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-2">
                  Especial de Almuerzo
                </h3>
                <p className="text-[#8b5b5d] dark:text-gray-400 text-base font-normal leading-normal mb-4">
                  Obtén una pizza personal y una ensalada por $10. Disponible de lunes a viernes, de 11 AM a 2 PM.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-[#e8b4b7]">$10.00</span>
                    <span className="text-sm text-[#8b5b5d] dark:text-gray-400 line-through ml-2">$15.98</span>
                  </div>
                  <Link
                    href="/menu"
                    className="bg-[#e8b4b7] text-[#191011] px-6 py-2 rounded-full font-bold hover:bg-[#d4a1a4] transition-colors"
                  >
                    Ordenar Ahora
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Two for Tuesday */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div
                  className="h-48 md:h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
                  }}
                ></div>
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-[#191011] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-2">
                  Martes 2x1
                </h3>
                <p className="text-[#8b5b5d] dark:text-gray-400 text-base font-normal leading-normal mb-4">
                  Compra una pizza grande a precio regular y obtén una segunda pizza grande de igual o menor valor al
                  50% de descuento.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-[#e8b4b7]">50% OFF</span>
                    <span className="text-sm text-[#8b5b5d] dark:text-gray-400 ml-2">en la segunda pizza</span>
                  </div>
                  <Link
                    href="/menu"
                    className="bg-[#e8b4b7] text-[#191011] px-6 py-2 rounded-full font-bold hover:bg-[#d4a1a4] transition-colors"
                  >
                    Ordenar Ahora
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Student Discount */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div
                  className="h-48 md:h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
                  }}
                ></div>
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-[#191011] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-2">
                  Descuento Estudiantil
                </h3>
                <p className="text-[#8b5b5d] dark:text-gray-400 text-base font-normal leading-normal mb-4">
                  Muestra tu identificación estudiantil y obtén 15% de descuento en todo tu pedido. Válido para comer en
                  el local y para llevar.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-[#e8b4b7]">15% OFF</span>
                    <span className="text-sm text-[#8b5b5d] dark:text-gray-400 ml-2">con ID estudiantil</span>
                  </div>
                  <Link
                    href="/menu"
                    className="bg-[#e8b4b7] text-[#191011] px-6 py-2 rounded-full font-bold hover:bg-[#d4a1a4] transition-colors"
                  >
                    Ordenar Ahora
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Early Bird Special */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div
                  className="h-48 md:h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
                  }}
                ></div>
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-[#191011] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-2">
                  Especial Madrugador
                </h3>
                <p className="text-[#8b5b5d] dark:text-gray-400 text-base font-normal leading-normal mb-4">
                  Ordena antes de las 5 PM y obtén un aperitivo gratis con cualquier compra de pizza grande.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-[#e8b4b7]">Aperitivo GRATIS</span>
                    <span className="text-sm text-[#8b5b5d] dark:text-gray-400 ml-2">antes de las 5 PM</span>
                  </div>
                  <Link
                    href="/menu"
                    className="bg-[#e8b4b7] text-[#191011] px-6 py-2 rounded-full font-bold hover:bg-[#d4a1a4] transition-colors"
                  >
                    Ordenar Ahora
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
