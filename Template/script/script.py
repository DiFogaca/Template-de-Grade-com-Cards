import pygame
import threading
import time
from pynput.keyboard import Key, Controller as KeyboardController

# Inicializa o Pygame
pygame.init()

# Define as cores com transparência
BLACK = (0, 0, 0, 255)
RED = (255, 0, 0, 128)  # 50% transparente
DARK_RED = (64, 0, 0, 128)  # Vermelho escuro para luz apagada
GREEN = (0, 255, 0, 128)  # 50% transparente
DARK_GREEN = (0, 64, 0, 128)  # Verde escuro para luz apagada
WHITE = (255, 255, 255, 255)

# Define o tamanho da janela
size = (300, 400)
screen = pygame.display.set_mode(size, pygame.SRCALPHA)
pygame.display.set_caption("Semáforo")

# Inicializa o controlador de teclado
keyboard = KeyboardController()
is_active = True
done = False
previous_state = is_active

# Função para alternar o estado ativo/inativo
def toggle():
    global is_active
    is_active = not is_active

# Função que gerencia a lógica de pressionar a tecla e alternar estados
def key_press_loop():
    global done, is_active, previous_state
    press_time = time.time()
    
    while not done:
        if is_active:
            # Pressiona Shift a cada 30 segundos
            if time.time() - press_time >= 30:
                print("Pressionando Shift")
                keyboard.press(Key.shift)
                keyboard.release(Key.shift)
                press_time = time.time()
        time.sleep(0.1)  # Pequena pausa para evitar uso excessivo de CPU

# Função principal que gerencia o loop do Pygame
def main_loop():
    global done, previous_state
    clock = pygame.time.Clock()
    font = pygame.font.SysFont('ArialBlack', 18)
    
    while not done:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                done = True
            elif event.type == pygame.MOUSEBUTTONDOWN:
                toggle()

        # Verifica se o estado mudou e imprime apenas uma vez
        if is_active != previous_state:
            print(f"is_active: {is_active}")
            previous_state = is_active

        # Preenche a tela com preto
        screen.fill(BLACK)

        # Desenha os círculos do semáforo com transparência e adiciona o texto correspondente
        if is_active:
            pygame.draw.circle(screen, DARK_RED, (150, 100), 50)  # Vermelho apagado
            pygame.draw.circle(screen, GREEN, (150, 300), 50)  # Verde aceso
            text = font.render("RODANDO", True, WHITE)
            text_rect = text.get_rect(center=(150, 300))
            screen.blit(text, text_rect)
        else:
            pygame.draw.circle(screen, RED, (150, 100), 50)  # Vermelho aceso
            pygame.draw.circle(screen, DARK_GREEN, (150, 300), 50)  # Verde apagado
            text = font.render("PARADO", True, WHITE)
            text_rect = text.get_rect(center=(150, 100))
            screen.blit(text, text_rect)

        # Renderiza o texto "Tcha-naaannn"
        main_text = font.render("Tcha-naaannn", True, WHITE)
        main_text_rect = main_text.get_rect(center=(150, 200))
        screen.blit(main_text, main_text_rect)

        pygame.display.flip()
        clock.tick(60)

# Iniciar a função de pressionar a tecla em uma thread separada
key_press_thread = threading.Thread(target=key_press_loop)
key_press_thread.daemon = True
key_press_thread.start()

# Iniciar o loop principal do Pygame
main_loop()

# Finaliza o Pygame
pygame.quit()