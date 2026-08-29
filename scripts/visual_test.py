import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 800})
        await page.goto('http://localhost:3000')

        # WhatsApp Chat focus state
        await page.focus('button[aria-controls="whatsapp-chat-panel"]')
        await page.screenshot(path='whatsapp_focus.png')

        # Footer
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
        await page.wait_for_timeout(1000)
        await page.screenshot(path='footer.png')

        await browser.close()

asyncio.run(run())
