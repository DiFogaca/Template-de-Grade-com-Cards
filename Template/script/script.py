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

keyboard = KeyboardController()
is_active = True
done = False

def press_key():
    global done
    while not done:
        if is_active:
            print("Pressionando Shift")
            keyboard.press(Key.shift)
            keyboard.release(Key.shift)
        time.sleep(30)

def toggle():
    global is_active
    is_active = not is_active

# Loop principal
clock = pygame.time.Clock()

# Iniciar a função de pressionar a tecla em uma thread separada
thread = threading.Thread(target=press_key)
thread.daemon = True
thread.start()

# Configurar a fonte para o texto
font = pygame.font.SysFont('ArialBlack', 18)

while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True
        elif event.type == pygame.MOUSEBUTTONDOWN:
            toggle()

    print(f"is_active: {is_active}")

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

# Finaliza o Pygame e a thread
done = True  # Finaliza a thread
thread.join()  # Aguarda a finalização da thread
pygame.quit()