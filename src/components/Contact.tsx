import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';

export default function Contact() {
  const address = "HFPP+VQ8, Jomin Tim., Kec. Kota Baru, Karawang, Jawa Barat 41374";
  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
<h2 className="text-3xl font-bold text-gray-900 text-center">
  Kunjungi Toko Kami
</h2>
<p className="text-xl text-gray-600 max-w-3xl mx-auto">
  Makan di tempat atau delivery? Kami siap!
</p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Hubungi Kami</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Alamat</h4>
                    <p className="text-gray-600">Jomin Timur, Kec. Kota Baru, Karawang, Jawa Barat 41374</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Telepon</h4>
                    <p className="text-gray-600">+62 896-0176-9293</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">pangsitsouhot@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Jam Buka</h4>
                    <div className="text-gray-600">
            <p>Senin - Jumat: 10.00 - 22.00 WIB</p>
            <p>Sabtu - Minggu: 09.00 - 23.00 WIB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  Lihat Rute
                  </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3964.8536901641087!2d107.484364!3d-6.4128392!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e696d0035de20a5%3A0x2da3b0bd5d20d279!2sPANGSIT%20SOUHOT!5e0!3m2!1sid!2sid!4v1751117831825!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
