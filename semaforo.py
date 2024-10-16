import pygame
import time

# Inicializa o Pygame
pygame.init()

# Define as cores
BLACK = (0, 0, 0)
RED = (255, 0, 0)
YELLOW = (255, 255, 0)
GREEN = (0, 255, 0)

# Define o tamanho da janela
size = (200, 600)
screen = pygame.display.set_mode(size)

pygame.display.set_caption("Semáforo")

# Loop principal
done = False
clock = pygame.time.Clock()

while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True

    # Preenche a tela com preto
    screen.fill(BLACK)

    # Desenha os círculos do semáforo
    pygame.draw.circle(screen, RED, (100, 100), 50)
    pygame.display.flip()
    time.sleep(5)

    pygame.draw.circle(screen, BLACK, (100, 100), 50)
    pygame.draw.circle(screen, YELLOW, (100, 300), 50)
    pygame.display.flip()
    time.sleep(2)

    pygame.draw.circle(screen, BLACK, (100, 300), 50)
    pygame.draw.circle(screen, GREEN, (100, 500), 50)
    pygame.display.flip()
    time.sleep(5)

    pygame.draw.circle(screen, BLACK, (100, 500), 50)

    clock.tick(60)

pygame.quit()
