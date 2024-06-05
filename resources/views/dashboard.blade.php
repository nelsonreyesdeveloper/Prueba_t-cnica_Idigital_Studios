<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">

                    {{-- ACCEDER SI TIENE PERMISOS DE ADMIN O USUARIO --}}

                    @if (auth()->user()->hasRole('Administrador'))
                        <h1 class="text-2xl font-bold mb-4">Bienvenido Administrador</h1>
                    @endif

                    @if (auth()->user()->hasRole('Usuario'))
                        <h1 class="text-2xl font-bold mb-4">Bienvenido Usuario</h1>
                    @endif


                </div>
            </div>
        </div>
    </div>
</x-app-layout>
